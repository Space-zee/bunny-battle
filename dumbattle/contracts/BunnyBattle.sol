//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IBunnyBattle } from "./interfaces/IBunnyBattle.sol";
import { ICreateVerifier, IMoveVerifier } from "./interfaces/IProofVerification.sol";

contract BunnyBattle is Ownable, IBunnyBattle {
  uint256 constant feePercentage = 1 ether; // 1 %
  uint256 constant makeMoveTimestamp = 60 seconds;

  ICreateVerifier public immutable createVerifier;
  IMoveVerifier public immutable moveVerifier;

  uint256 public nextGameID;
  uint256 public accumulatedFee;
  mapping(uint256 => Game) private games;

  constructor (
    ICreateVerifier _createVerifier,
    IMoveVerifier _moveVerifier
  ) Ownable(msg.sender){
    createVerifier = _createVerifier;
    moveVerifier = _moveVerifier;
  }

  function createGame(
    bytes calldata _proof,
    uint256 _boardHash,
    uint256 _betAmount
  ) external payable returns (uint256) {
    _requireCreateProof(_proof, _boardHash);

    uint256 _currentID = nextGameID;
    nextGameID += 1;

    Game storage g = games[_currentID];
    g.player1 = msg.sender;
    g.player1Hash = _boardHash;
    g.movesSize = 0;
    g.betAmount = _betAmount;
    _depositEther(_currentID);
    emit GameCreated(_currentID, msg.sender, _betAmount);

    return _currentID;
  }

  function joinGame(
    uint32 _gameID,
    bytes calldata _proof,
    uint256 _boardHash
  ) external payable {
    if(_gameID >= nextGameID) revert InvalidGameID();

    Game storage g = games[_gameID];

    if(g.player1 == msg.sender) revert NotAllowedJoinGame();
    if(g.player2 != address(0)) revert NotAllowedJoinGame();

    _requireCreateProof(_proof, _boardHash);
    _depositEther(_gameID);

    g.player2 = msg.sender;
    g.player2Hash = _boardHash;
    emit GameJoint(_gameID, msg.sender);
  }

  function submitMove(
    uint32 _gameID,
    uint _moveX,
    uint _moveY,
    bytes calldata _proof,
    bool isPreviousMoveAHit
  ) external {
    if(_gameID >= nextGameID) revert InvalidGameID();
    Game storage g = games[_gameID];
    if(g.winner != address(0)) revert GameIsFinished();
    if(g.nextMoveDeadline > 0 && g.nextMoveDeadline < block.timestamp) revert TechnicalLose();

    uint256 _boardHash = g.player1Hash;
    if (g.movesSize % 2 == 0) {
      if(msg.sender != g.player1) revert InvalidTurn();
    } else {
      if(msg.sender != g.player2) revert InvalidTurn();
      _boardHash = g.player2Hash;
    }

    if(_moveX < 0 && _moveX >= 3) revert InvalidMoveX();
    if(_moveY < 0 && _moveY >= 3) revert InvalidMoveY();

    // for the not-first move, ensure the previous guess is marked as hit/no-hit
    if (g.movesSize > 0) {
      Move storage previousMove = g.moves[g.movesSize - 1];
      _requireMoveProof(_proof, _boardHash, isPreviousMoveAHit, previousMove.x, previousMove.y);
      previousMove.isHit = isPreviousMoveAHit;
      if  (isPreviousMoveAHit) g.totalHits[g.movesSize % 2 == 0 ? g.player2 : g.player1]++;
    }

    // check previous player move
    if (g.totalHits[g.movesSize % 2 == 0 ? g.player2 : g.player1 ] == 2){
      g.winner = g.movesSize % 2 == 0 ? g.player1 : g.player2;
      _claimReward(_gameID, g.winner);
      emit GameFinished(_gameID, g.winner, g.movesSize);
    }
    
    g.moves[g.movesSize] = Move({
      x: _moveX,
      y: _moveY,
      isHit: false
    });
    g.movesSize += 1;
    g.nextMoveDeadline = block.timestamp + makeMoveTimestamp;
    emit MoveSubmited(_gameID, msg.sender, _moveX, _moveY, isPreviousMoveAHit);
  }

  function claimCommission() external onlyOwner {
    uint256 fee = accumulatedFee;
    if(fee == 0) revert NothingToClaim();
    _sendEther(msg.sender, fee);
    emit CommissionClaimed(fee);
  }

  function claimReward(uint256 _gameID) external {
    Game storage g = games[_gameID];
    if(g.nextMoveDeadline > block.timestamp || g.winner != address(0)) revert FailedToClaimReward();
    _claimReward(_gameID, msg.sender);
  }

  function game(uint32 _gameID) external view returns (GamePublicMetadata memory) {
    if(_gameID >= nextGameID) revert InvalidGameID();
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

  function _requireCreateProof(
    bytes calldata _proof,
    uint256 _boardHash
  ) internal {
    uint256[8] memory p = abi.decode(_proof, (uint256[8]));
    if(
      !createVerifier.verifyProof(
        [p[0], p[1]],
        [[p[2], p[3]], [p[4], p[5]]],
        [p[6], p[7]],
        [_boardHash]
      )) revert InvalidBoardStateZK();
  }

  function _requireMoveProof(
    bytes calldata _proof,
    uint256 _boardHash,
    bool isHit,
    uint x,
    uint y
  ) internal {
    uint256[8] memory p = abi.decode(_proof, (uint256[8]));
    if(
      !moveVerifier.verifyProof(
        [p[0], p[1]],
        [[p[2], p[3]], [p[4], p[5]]],
        [p[6], p[7]],
        [isHit ? 1 : 0, _boardHash, x, y]
      )) revert InvalidMoveZK();
  }

  function _depositEther(uint256 _gameID) internal {
    Game storage g = games[_gameID];
    if (msg.value != g.betAmount) revert IncorrectBetAmount();
    g.totalBetAmount += msg.value;
    emit EtherDeposited(_gameID, msg.sender, msg.value);
  }

  function _claimReward(uint256 _gameID, address winner) internal {
    Game storage g = games[_gameID];
    if (g.winner != address(0)){
      if(winner != g.winner) revert InvalidWinner();
    } else if (g.movesSize == 0 ) {
      if(winner != g.player2) revert InvalidWinner();
    } else if (g.nextMoveDeadline > block.timestamp) {
      // get player who did last move
      if (g.movesSize % 2 == 0) {
      if(winner != g.player1) revert InvalidWinner();
      } else {
      if(winner != g.player2) revert InvalidWinner();
      }
    }
    
    uint256 treasuryFee = g.totalBetAmount * feePercentage / 100 ether;
    accumulatedFee += treasuryFee;
    _sendEther(msg.sender, g.totalBetAmount - treasuryFee);
    emit CommissionAccumulated(_gameID, treasuryFee);
  }

  function _sendEther(address account, uint256 amount) private{
    (bool success, ) = account.call{value: amount}("");
    if(!success) revert FailedEtherSend();
  }
}
