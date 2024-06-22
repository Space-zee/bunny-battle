//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

interface IBoardVerifier {
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