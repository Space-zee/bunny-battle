//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

interface ICreateVerifier {
  function verifyProof(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[1] memory input
  ) external returns (bool);
}

interface IMoveVerifier {
  function verifyProof(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[4] memory _input
  ) external returns (bool);
}

contract Battleship is Ownable{
  ICreateVerifier public immutable createVerifier;
  IMoveVerifier public immutable moveVerifier;

  struct Move {
    uint x;
    uint y;
    bool isHit;
  }

  struct Game {
    address player1;
    address player2;
    address winner;
    uint256 player1Hash;
    uint256 player2Hash;
    uint256 betAmount;
    uint256 totalBetAmount;
    uint256 movesSize;
    mapping(uint256 => Move) moves;
    mapping(address => uint256) totalHits;
  }

  struct GamePublicMetadata {
    address player1;
    address player2;
    uint256 player1Hash;
    uint256 player2Hash;
    Move[] moves;
  }

  uint32 nextGameID;
  mapping(uint256 => Game) games;
  uint256 feePercentage = 0.001 ether; // 0.001 %
  uint256 public accumulatedFee;

  constructor (
    ICreateVerifier _createVerifier,
    IMoveVerifier _moveVerifier
  ) Ownable(msg.sender){
    createVerifier = _createVerifier;
    moveVerifier = _moveVerifier;
  }

  function requireCreateProof(
    bytes calldata _proof,
    uint256 _boardHash
  ) internal {
    uint256[8] memory p = abi.decode(_proof, (uint256[8]));
    require(
      createVerifier.verifyProof(
        [p[0], p[1]],
        [[p[2], p[3]], [p[4], p[5]]],
        [p[6], p[7]],
        [_boardHash]
      ),
      "Invalid board state (ZK)"
    );
  }

  function requireMoveProof(
    bytes calldata _proof,
    uint256 _boardHash,
    bool isHit,
    uint x,
    uint y
  ) internal {
    uint256[8] memory p = abi.decode(_proof, (uint256[8]));
    require(
      moveVerifier.verifyProof(
        [p[0], p[1]],
        [[p[2], p[3]], [p[4], p[5]]],
        [p[6], p[7]],
        [isHit ? 1 : 0, _boardHash, x, y]
      ),
      "Invalid move (ZK)"
    );
  }

  function createGame(
    bytes calldata _proof,
    uint256 _boardHash,
    uint256 _betAmount
  ) external payable returns (uint32) {
    requireCreateProof(_proof, _boardHash);

    uint32 _currentID = nextGameID;
    nextGameID += 1;

    Game storage g = games[_currentID];
    g.player1 = msg.sender;
    g.player1Hash = _boardHash;
    g.movesSize = 0;
    g.betAmount = _betAmount;
    _depositEther(_currentID, msg.value);

    return _currentID;
  }

  function joinGame(
    uint32 _gameID,
    bytes calldata _proof,
    uint256 _boardHash
  ) external payable {
    require(_gameID >= 0, "Invalid Game ID");
    require(_gameID < nextGameID, "Invalid Game ID");

    Game storage g = games[_gameID];

    require(g.player1 != msg.sender, "Not allowed to join your own game");
    require(g.player2 == address(0), "Game is full");

    requireCreateProof(_proof, _boardHash);
    _depositEther(_gameID, msg.value);

    g.player2 = msg.sender;
    g.player2Hash = _boardHash;
  }

  function submitMove(
    uint32 _gameID,
    uint _moveX,
    uint _moveY,
    bytes calldata _proof,
    bool isPreviousMoveAHit
  ) external {
    require(_gameID >= 0, "Invalid Game ID");
    require(_gameID < nextGameID, "Invalid Game ID");
    Game storage g = games[_gameID];
    require(g.winner == address(0), "Game is finished");

    uint256 _boardHash = g.player1Hash;
    if (g.movesSize % 2 == 0) {
      require(msg.sender == g.player1, "Not your turn!");
    } else {
      require(msg.sender == g.player2, "Not your turn!");
      _boardHash = g.player2Hash;
    }

    require(_moveX >= 0 && _moveX < 3, "Invalid Move (X)");
    require(_moveY >= 0 && _moveY < 3, "Invalid Move (Y)");

    // For the not-first move, ensure the previous guess is marked as hit/no-hit
    if (g.movesSize > 0) {
      Move storage previousMove = g.moves[g.movesSize - 1];
      requireMoveProof(_proof, _boardHash, isPreviousMoveAHit, previousMove.x, previousMove.y);
      previousMove.isHit = isPreviousMoveAHit;
      if  (isPreviousMoveAHit) g.totalHits[g.movesSize % 2 == 0 ? g.player2 : g.player1]++;
    }

    // check previous player move
    if (g.totalHits[g.movesSize % 2 == 0 ? g.player2 : g.player1 ] == 2){
      g.winner = g.movesSize % 2 == 0 ? g.player1 : g.player2;
      _claimReward(_gameID, g.winner);
    }
    
    g.moves[g.movesSize] = Move({
      x: _moveX,
      y: _moveY,
      isHit: false
    });
    g.movesSize += 1;
  }

  function _depositEther(uint256 _gameID, uint256 betAmount) internal {
    Game storage g = games[_gameID];
    require (msg.value == betAmount, "Incorrect bet amount");
    g.totalBetAmount += msg.value;
  }

  function _claimReward(uint256 _gameID, address winner) internal {
    Game storage g = games[_gameID];
    require(winner == g.winner, "Not a winner");
    uint256 treasuryFee = g.totalBetAmount * feePercentage / 100 ether;
    accumulatedFee += treasuryFee;
    _sendEther(msg.sender, g.totalBetAmount - treasuryFee);
  }

  function claimCommission() public onlyOwner {
    require(accumulatedFee > 0, "Nothing to claim");
    _sendEther(msg.sender, accumulatedFee);
  }

  function _sendEther(address account, uint256 amount) private{
    (bool success, ) = account.call{value: amount}("");
    require(success, "Failed to send Ether");
  }

  function game(uint32 _gameID) public view returns (GamePublicMetadata memory) {
    require(_gameID >= 0, "Invalid Game ID");
    require(_gameID < nextGameID, "Invalid Game ID");
    Game storage g = games[_gameID];

    Move[] memory _moves = new Move[](g.movesSize);
    for (uint i = 0; i < g.movesSize; i++) {
      _moves[i] = g.moves[i];
    }

    return GamePublicMetadata({
      player1: g.player1,
      player1Hash: g.player1Hash,
      player2: g.player2,
      player2Hash: g.player2Hash,
      moves: _moves
    });
  }
}
