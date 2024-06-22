import { ZeroAddress } from "ethers";

const { ethers, run } = require("hardhat");

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
  const bunnyBattle = await BunnyBattle.deploy(await createVerifier.getAddress(), await moveVerifier.getAddress());
  await bunnyBattle.waitForDeployment();
  console.log("BunnyBattle: ", await bunnyBattle.getAddress());


  try {
    console.log("Starting verification process...");
    await run("verify:verify", {
      address: await bunnyBattle.getAddress(),
      constructorArguments: [await createVerifier.getAddress(), await moveVerifier.getAddress()],
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