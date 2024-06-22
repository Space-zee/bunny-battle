//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

contract IBunnyBattle {
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
    uint256 nextMoveDeadline;
    mapping(uint256 => Move) moves;
    mapping(address => uint256) totalHits;
  }

  struct GamePublicMetadata {
    address player1;
    address player2;
    address winner;
    uint256 player1Hash;
    uint256 player2Hash;
    uint256 totalBetAmount;
    uint256 nextMoveDeadline;
    Move[] moves;
  }

  error InvalidBoardStateZK();
  error InvalidMoveZK();
  error InvalidGameID();
  error NotAllowedJoinGame();
  error GameIsFinished();
  error InvalidTurn();
  error InvalidMoveX();
  error InvalidMoveY();
  error IncorrectBetAmount();
  error InvalidWinner();
  error NothingToClaim();
  error FailedEtherSend();
  error TechnicalLose();
  error FailedToClaimReward();

  event GameCreated(uint256 indexed gameId, address creator, uint256 betAmount);
  event GameJoined(uint256 indexed gameId, address participant);
  event MoveSubmitted(uint256 indexed gameId, address participant, uint256 _moveX, uint256 _moveY,  bool isPreviousMoveAHit);
  event GameFinished(uint256 indexed gameId, address winner, uint256 moveSize);
  event EtherDeposited(uint256 indexed gameId, address participant, uint256 betAmount);
  event CommissionAccumulated(uint256 indexed gameId, uint256 commission);
  event CommissionClaimed(uint256 accumulatedFee);
}
