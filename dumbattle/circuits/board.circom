pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "./consts.circom";

template BoardCreation() {
  signal input nonce;
  signal input bunnies[2][2]; // [x,y]

  signal output out;

  var boardSize = getBoardSize();
  var pts[boardSize][boardSize] = getEmptyBoard();

  for (var i = 0; i < 2; i++) {
    // validate position
    assert(bunnies[i][0] >= 0 && bunnies[i][0] < boardSize);
    assert(bunnies[i][1] >= 0 && bunnies[i][1] < boardSize);

    var x = bunnies[i][0];
    var y = bunnies[i][1];
    assert(pts[x][y] == 0);
    pts[x][y] = 1;
  }

  component poseidon = Poseidon(3);
  poseidon.inputs[0] <== nonce;
  for (var i = 0; i < 2; i++) {
    poseidon.inputs[i+1] <== (bunnies[i][0] * (10 ** 1)) + (bunnies[i][1] * (10 ** 2));
  }
  out <-- poseidon.out;
}

component main = BoardCreation();
