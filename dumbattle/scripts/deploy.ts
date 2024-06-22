import { ZeroAddress } from "ethers";

const { ethers } = require("hardhat");

async function main() {
  // We get the contract to deploy

  const CreateVerifier = await ethers.getContractFactory("contracts/createVerifier.sol:Groth16Verifier");
  const createVerifier = await CreateVerifier.deploy();
  await createVerifier.waitForDeployment();
  console.log("CreateVerifier: ", await createVerifier.getAddress());

  const MoveVerifier = await ethers.getContractFactory("contracts/moveVerifier.sol:Groth16Verifier");
  const moveVerifier = await MoveVerifier.deploy();
  await moveVerifier.waitForDeployment();
  console.log("MoveVerifier: ", await moveVerifier.getAddress());

  const BunnyBattle = await ethers.getContractFactory("BunnyBattle");
  const bunnyBattle = await BunnyBattle.deploy(ZeroAddress, ZeroAddress);
  await bunnyBattle.waitForDeployment();
  console.log("BunnyBattle: ", await bunnyBattle.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });