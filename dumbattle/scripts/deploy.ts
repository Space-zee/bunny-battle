import { ZeroAddress } from "ethers";

const { ethers, run } = require("hardhat");

async function main() {
  // We get the contract to deploy

  const BoardVerifier = await ethers.getContractFactory("contracts/boardVerifier.sol:Groth16Verifier");
  const boardVerifier = await BoardVerifier.deploy();
  await boardVerifier.waitForDeployment();
  console.log("BoardVerifier: ", await boardVerifier.getAddress());

  const MoveVerifier = await ethers.getContractFactory("contracts/moveVerifier.sol:Groth16Verifier");
  const moveVerifier = await MoveVerifier.deploy();
  await moveVerifier.waitForDeployment();
  console.log("MoveVerifier: ", await moveVerifier.getAddress());

  const BunnyBattle = await ethers.getContractFactory("BunnyBattle");
  const bunnyBattle = await BunnyBattle.deploy(await boardVerifier.getAddress(), await moveVerifier.getAddress());
  await bunnyBattle.waitForDeployment();
  console.log("BunnyBattle: ", await bunnyBattle.getAddress());


  try {
    console.log("Starting verification process...");
    await run("verify:verify", {
      address: await bunnyBattle.getAddress(),
      constructorArguments: [await boardVerifier.getAddress(), await moveVerifier.getAddress()],
    });
    const network = await ethers.provider.getNetwork();
    // Determine the network and construct the Scrollscan URL
    const scrollscanUrl = getScrollscanUrl(network.name);
    
    console.log(`Contract verified. Check on Scrollscan: ${scrollscanUrl}/address/${bunnyBattle.address}`);
  }
  catch (error) {
    console.error("Error during verification:", error);
  }
}

function getScrollscanUrl(networkName: string) {
    switch (networkName) {
      case "scrollMainnet":
        return "https://scrollscan.com";
      case "scrollTestnet":
        return "https://sepolia.scrollscan.com";
      default:
        return "https://scrollscan.com";
    }
}  

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });