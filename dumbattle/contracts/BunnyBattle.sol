//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IBunnyBattle } from "./interfaces/IBunnyBattle.sol";
import { IBoardVerifier, IMoveVerifier } from "./interfaces/IProofVerification.sol";

/// @dev BunnyBattle contract that uses zk proof for fair game 
contract BunnyBattle is Ownable, IBunnyBattle {
  /// @dev fee percentage amount that subtract from each game pool prize
  uint256 constant public feePercentage = 1 ether; // 1 %
  /// @dev time that allowed for user to make a move
  uint256 constant public makeMoveTimestamp = 60 seconds;
  /// @dev min bet amount for game deposit
  uint256 constant public minBetAmount = 0.001 ether;

  /// @dev proof verifier contracts 
  IBoardVerifier public immutable boardVerifier;
  IMoveVerifier public immutable moveVerifier;

  /// @dev id of the next game
  uint256 public nextGameID;
  /// @dev accumulated fee from the passed games
  uint256 public accumulatedFee;
  /// @dev info about games
  mapping(uint256 => Game) private games;

  /// @dev Initialize constructor parameters
  /// @param _boardVerifier verifier contract for board creation proof to start or join
  /// @param _moveVerifier verifier contract for making a move proof
  constructor (
    IBoardVerifier _boardVerifier,
    IMoveVerifier _moveVerifier
  ) Ownable(msg.sender){
    boardVerifier = _boardVerifier;
    moveVerifier = _moveVerifier;
  }

  /// @dev Create new game with the first player as msg.sender
  /// @param _proof proof of board creation
  /// @param _boardHash hash of the initial board state, to make sure user doesn't change the initial board view
  /// @param _betAmount amount of the bet for the current game. Both user should pay this amount to join the game. 
  /// The user creates game and sets bet amount. 
  /// Emits as {GameCreated} event
  function createGame(
    bytes calldata _proof,
    uint256 _boardHash,
    uint256 _betAmount
  ) external payable returns (uint256) {
    _requireCreateProof(_proof, _boardHash);
    if (_betAmount < minBetAmount) revert IncorrectBetAmount();

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

  /// @dev Join game with id `_gameID`
  /// @param _gameID id of the game to join
  /// @param _proof proof of board creation
  /// @param _boardHash hash of the initial board state, to make sure user doesn't change the initial board view
  /// The user needs to deposit betAmount to join the game
  /// Emits as {GameJoined} event
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
    g.nextMoveDeadline = block.timestamp + makeMoveTimestamp;
    emit GameJoined(_gameID, msg.sender);
  }

  /// @dev Submit move function
  /// @param _gameID id of the game to join
  /// @param _moveX x coordinate of the current move
  /// @param _moveY y coordinate of the current move
  /// @param _proof proof that verify prev move
  /// @param isPreviousMoveAHit point if the prev move was a hit
  /// We check if the user gor 2 hits to detect the winner
  /// User has only 1 minute to make a move otherwise technical lose will appear
  /// Emits as {MoveSubmitted} event and {GameFinished} event
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
      if  (isPreviousMoveAHit) g.totalHits[msg.sender]++;
    }

    // check previous player move
    if (g.totalHits[msg.sender] == 2){
      g.winner = g.movesSize % 2 == 0 ? g.player2 : g.player1;
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
    emit MoveSubmitted(_gameID, msg.sender, _moveX, _moveY, isPreviousMoveAHit);
  }

  /// @dev Claim commission accumulated on the contract
  /// Only owner can call the function
  /// Emits as {CommissionClaimed} event
  function claimCommission() external onlyOwner {
    uint256 fee = accumulatedFee;
    if(fee == 0) revert NothingToClaim();
    _sendEther(msg.sender, fee);
    emit CommissionClaimed(fee);
  }

  /// @dev Claim reward in the case of the technical lose
  /// If the first player didn't make a first move the second player win
  /// If any of the player miss the move the player with the last turn win
  /// Can't be called if the game was finished natural
  function claimReward(uint256 _gameID) external {
    Game storage g = games[_gameID];
    if(g.nextMoveDeadline > block.timestamp || g.winner != address(0)) revert FailedToClaimReward();
    _claimReward(_gameID, msg.sender);
    g.winner = msg.sender;
  }

  /// @dev Return metadata of the game
  /// @param _gameID id of the game required
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
      winner: g.winner,
      player2: g.player2,
      player2Hash: g.player2Hash,
      totalBetAmount: g.totalBetAmount,
      nextMoveDeadline: g.nextMoveDeadline,
      moves: _moves
    });
  }

  function _requireCreateProof(
    bytes calldata _proof,
    uint256 _boardHash
  ) internal {
    uint256[8] memory p = abi.decode(_proof, (uint256[8]));
    if(
      !boardVerifier.verifyProof(
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
    } else if (g.nextMoveDeadline < block.timestamp) {
      // get player who did last move
      if (g.movesSize % 2 == 0) {
        if(winner != g.player2) revert InvalidWinner();
      } else {
        if(winner != g.player1) revert InvalidWinner();
      }
    }
    
    uint256 treasuryFee = g.totalBetAmount * feePercentage / 100 ether;
    accumulatedFee += treasuryFee;
    _sendEther(winner, g.totalBetAmount - treasuryFee);
    emit CommissionAccumulated(_gameID, treasuryFee);
  }

  function _sendEther(address account, uint256 amount) private{
    (bool success, ) = account.call{value: amount}("");
    if(!success) revert FailedEtherSend();
  }
}
