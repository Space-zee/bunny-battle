import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ZeroAddress, parseEther } from "ethers";
import { Address } from "cluster";
import { ethers } from "hardhat";
import { BunnyBattle } from "../typechain-types";

const player1Create = {
  "nonce": 12345,
  "ships": [
    [2, 2],
    [0, 0]
  ],
};

const player2Create = {
  "nonce": 23456,
  "ships": [
    [2, 2],
    [2, 1]
  ],
};

let account1: HardhatEthersSigner, account2: HardhatEthersSigner;
let createVerifier, moveVerifier;
let bunnyBattle: BunnyBattle;

describe("Battleship", function () {
  beforeEach(async ()=>{
     [account1, account2] = await ethers.getSigners();

    const CreateVerifier = await ethers.getContractFactory("contracts/createVerifier.sol:Groth16Verifier");
    createVerifier = await CreateVerifier.deploy();
    await createVerifier.waitForDeployment();

    const MoveVerifier = await ethers.getContractFactory("contracts/moveVerifier.sol:Groth16Verifier");
    moveVerifier = await MoveVerifier.deploy();
    await moveVerifier.waitForDeployment();

    const BunnyBattle = await ethers.getContractFactory("BunnyBattle");
    bunnyBattle = await BunnyBattle.deploy(createVerifier.getAddress(), moveVerifier.getAddress());
    await bunnyBattle.waitForDeployment();

  })
  it("Should play properly", async function () {
    const proof1 = await genCreateProof(player1Create);
    await bunnyBattle.connect(account1).createGame(proof1.solidityProof, proof1.inputs[0], parseEther("1"), { value: parseEther("1") });
    let game = await bunnyBattle.game(0);
    expect(game.player1 === account1.address);
    expect(game.player2 === '0x0000000000000000000000000000000000000000');
    expect(game.player1Hash).to.eq(BigInt(proof1.inputs[0]));

    const proof2 = await genCreateProof(player2Create);
    await bunnyBattle.connect(account2).joinGame(0, proof2.solidityProof, proof2.inputs[0],  { value: parseEther("1") });
    game = await bunnyBattle.game(0);
    expect(game.player1).to.equal(account1.address);
    expect(game.player2).to.equal(account2.address);
    expect(game.player1Hash).to.eq(BigInt(proof1.inputs[0]));
    expect(game.player2Hash).to.eq(BigInt(proof2.inputs[0]));
    expect(game.moves.length).to.equal(0);

    await bunnyBattle.connect(account1).submitMove(0, 1, 2, emptyProof, false);
    game = await bunnyBattle.game(0);
    expect(game.moves.length).to.equal(1);
    let prevMove = game.moves[0];
    expect(prevMove.x).to.eq(BigInt(1));
    expect(prevMove.y).to.eq(BigInt(2));


    const proof3 = await genMoveProof({
      // Public Inputs
      'boardHash': game.player2Hash.toString(),
      'guess': [prevMove.x, prevMove.y],
      // Private Inputs:
      'nonce': player2Create.nonce,
      'ships': player2Create.ships,
    });
    await bunnyBattle.connect(account2).submitMove(0, 0, 0, proof3.solidityProof, false);
    game = await bunnyBattle.game(0);
    expect(game.moves.length).to.equal(2);
    expect(game.moves[0].isHit).to.equal(false);
    prevMove = game.moves[1];
    expect(prevMove.x).to.eq(BigInt(0));
    expect(prevMove.y).to.eq(BigInt(0));

    const proof4 = await genMoveProof({
      // Public Inputs
      'boardHash': game.player1Hash.toString(),
      'guess': [prevMove.x, prevMove.y],
      // Private Inputs:
      'nonce': player1Create.nonce,
      'ships': player1Create.ships,
    });
    await bunnyBattle.connect(account1).submitMove(0, 2, 1, proof4.solidityProof, true);
    game = await bunnyBattle.game(0);
    expect(game.moves.length).to.equal(3);

  });

  it("Should deposit correct once game is created", async function () {
    const proof1 = await genCreateProof(player1Create);
    await bunnyBattle.connect(account1).createGame(proof1.solidityProof, proof1.inputs[0], parseEther("1"), { value: parseEther("1") });
    let game = await bunnyBattle.game(0);
    expect(game.player1 === account1.address);
    expect(game.player2 === '0x0000000000000000000000000000000000000000');
    expect(game.player1Hash).to.eq(BigInt(proof1.inputs[0]));
    expect(game.totalBetAmount).to.eq(parseEther("1"));
    expect(await ethers.provider.getBalance(bunnyBattle.getAddress())).to.be.eq(parseEther("1"))
  })

  it("Should deposit correct once join game", async function () {
    const proof1 = await genCreateProof(player1Create);
    await bunnyBattle.connect(account1).createGame(proof1.solidityProof, proof1.inputs[0], parseEther("1"), { value: parseEther("1") });
    
    const proof2 = await genCreateProof(player2Create);
    await bunnyBattle.connect(account2).joinGame(0, proof2.solidityProof, proof2.inputs[0],  { value: parseEther("1") });

    let game = await bunnyBattle.game(0);
    expect(game.player1 === account1.address);
    expect(game.player2 === account2.address);
    expect(game.player1Hash).to.eq(BigInt(proof1.inputs[0]));
    expect(game.totalBetAmount).to.eq(parseEther("2"));
    expect(await ethers.provider.getBalance(bunnyBattle.getAddress())).to.be.eq(parseEther("2"))
  })

  it("TechnicalLose possible", async function () {
    const [account1, account2] = await ethers.getSigners();

    const proof1 = await genCreateProof(player1Create);
    await bunnyBattle.connect(account1).createGame(proof1.solidityProof, proof1.inputs[0], parseEther("1"), { value: parseEther("1") });
    let game = await bunnyBattle.game(0);

    const proof2 = await genCreateProof(player2Create);
    await bunnyBattle.connect(account2).joinGame(0, proof2.solidityProof, proof2.inputs[0],  { value: parseEther("1") });
    game = await bunnyBattle.game(0);
    expect(game.moves.length).to.equal(0);

    await bunnyBattle.connect(account1).submitMove(0, 1, 2, emptyProof, false);
    game = await bunnyBattle.game(0);
    expect(game.moves.length).to.equal(1);
    let prevMove = game.moves[0];

    const proof3 = await genMoveProof({
      // Public Inputs
      'boardHash': game.player2Hash.toString(),
      'guess': [prevMove.x, prevMove.y],
      // Private Inputs:
      'nonce': player2Create.nonce,
      'ships': player2Create.ships,
    });
    await bunnyBattle.connect(account2).submitMove(0, 0, 0, proof3.solidityProof, false);
    game = await bunnyBattle.game(0);
    expect(game.moves.length).to.equal(2);
    expect(game.moves[0].isHit).to.equal(false);
    prevMove = game.moves[1];
    expect(prevMove.x).to.eq(BigInt(0));
    expect(prevMove.y).to.eq(BigInt(0));
    expect(game.winner).to.eq(ZeroAddress);

    let block = await ethers.provider.getBlock("latest");
    let timestamp = block.timestamp;
    const tmpTimestamp = game.nextMoveDeadline;
    expect(tmpTimestamp).to.be.greaterThan(timestamp); // timestamp is changed correctly 

    // // Move time forward by lesst than 1 min (58 seconds)
    await ethers.provider.send("evm_increaseTime", [58]);
    await ethers.provider.send("evm_mine", []);
    

    const proof4 = await genMoveProof({
      // Public Inputs
      'boardHash': game.player1Hash.toString(),
      'guess': [prevMove.x, prevMove.y],
      // Private Inputs:
      'nonce': player1Create.nonce,
      'ships': player1Create.ships,
    });
    await bunnyBattle.connect(account1).submitMove(0, 2, 1, proof4.solidityProof, true);
    game = await bunnyBattle.game(0);
    prevMove = game.moves[2];
    block = await ethers.provider.getBlock("latest");
    timestamp = block.timestamp;
    const lastNextTimestamp = game.nextMoveDeadline;
    expect(lastNextTimestamp).to.be.lessThanOrEqual(tmpTimestamp + BigInt(60)); // timestamp is changed correctly 

    // // Move time forward by 1 min (60 seconds)
    await ethers.provider.send("evm_increaseTime", [60]);
    await ethers.provider.send("evm_mine", []);
    
    const proof5 = await genMoveProof({
      // Public Inputs
      'boardHash': game.player2Hash.toString(),
      'guess': [prevMove.x, prevMove.y],
      // Private Inputs:
      'nonce': player2Create.nonce,
      'ships': player2Create.ships,
    });
    block = await ethers.provider.getBlock("latest");
    expect(lastNextTimestamp).to.be.lessThanOrEqual(block?.timestamp); // timestamp is changed correctly 
    await expect(bunnyBattle.connect(account2).submitMove(0, 2, 2, proof5.solidityProof, true)).to.be.rejectedWith("TechnicalLose");

    game = await bunnyBattle.game(0);
    expect(game.winner).to.eq(ZeroAddress);
    
    // check claimReward
  });
});

// Utils (should be split out of test/)

const snarkjs = require('snarkjs')
const fs = require('fs')

const emptyProof = '0x0000000000000000000000000000000000000000000000000000000000000000';

const createWC = require('../circom/create/create_js/witness_calculator.js');
const createWasm = './circom/create/create_js/create.wasm'
const createZkey = './circom/create/create_0001.zkey'
const moveWC = require('../circom/move/move_js/witness_calculator.js');
const moveWasm = './circom/move/move_js/move.wasm'
const moveZkey = './circom/move/move_0001.zkey'

const WITNESS_FILE = '/tmp/witness'

const genCreateProof = async (input: any) => {
  const buffer = fs.readFileSync(createWasm);
  const witnessCalculator = await createWC(buffer);
  const buff = await witnessCalculator.calculateWTNSBin(input);
  // The package methods read from files only, so we just shove it in /tmp/ and hope
  // there is no parallel execution.
  fs.writeFileSync(WITNESS_FILE, buff);
  const { proof, publicSignals } = await snarkjs.groth16.prove(createZkey, WITNESS_FILE);
  const solidityProof = proofToSolidityInput(proof);
  return {
    solidityProof: solidityProof,
    inputs: publicSignals,
  }
}

const genMoveProof = async (input: any) => {
  const buffer = fs.readFileSync(moveWasm);
  const witnessCalculator = await moveWC(buffer);
  const buff = await witnessCalculator.calculateWTNSBin(input);
  fs.writeFileSync(WITNESS_FILE, buff);
  const { proof, publicSignals } = await snarkjs.groth16.prove(moveZkey, WITNESS_FILE);
  const solidityProof = proofToSolidityInput(proof);
  return {
    solidityProof: solidityProof,
    inputs: publicSignals,
  }
}

// Instead of passing in a large array of numbers (annoying), we
// just make proof a single string (which will be decompiled as a uint32
// in the contract)
// Copied from Tornado's websnark fork:
// https://github.com/tornadocash/websnark/blob/master/src/utils.js
const proofToSolidityInput = (proof: any): string => {
  const proofs: string[] = [
    proof.pi_a[0], proof.pi_a[1],
    proof.pi_b[0][1], proof.pi_b[0][0],
    proof.pi_b[1][1], proof.pi_b[1][0],
    proof.pi_c[0], proof.pi_c[1],
  ];
  const flatProofs = proofs.map(p => BigInt(p));
  return "0x" + flatProofs.map(x => toHex32(x)).join("")
}

const toHex32 = (num: BigInt) => {
  let str = num.toString(16);
  while (str.length < 64) str = "0" + str;
  return str;
}
