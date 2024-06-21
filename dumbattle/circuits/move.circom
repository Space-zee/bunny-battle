pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "./consts.circom";

function isMatch(guess, ship, len) {
    return (guess[0] == ship[0] && guess[1] == ship[1])
}

template BattleshipMove() {
  // Public Inputs:
  signal input boardHash;
  signal input guess[2]; // [x, y]
  // Private Inputs:
  signal input nonce;
  signal input ships[2][2]; // [[x1, y1], [x2, y2]]

  signal output isHit;

  var boardSize = getBoardSize();

  // 1. validate the guess is actually valid
  assert(guess[0] >= 0 && guess[0] < boardSize);
  assert(guess[1] >= 0 && guess[1] < boardSize);

  // 2. validate the inputted ships matches the public hash
  component poseidon = Poseidon(3);
  poseidon.inputs[0] <== nonce;
  for (var i = 0; i < 2; i++) {
    poseidon.inputs[i+1] <== (ships[i][0] * (10 ** 1)) + (ships[i][1] * (10 ** 2));
  }
  assert(boardHash == poseidon.out);

  // 3. check if it's a hit
  isHit <-- (
    isMatch(guess, ships[0]) ||
    isMatch(guess, ships[1])
  );
}

component main {public [boardHash, guess]} = BattleshipMove();
