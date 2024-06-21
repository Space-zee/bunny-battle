# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

### Additionally, install circom compiler and snarkjs globally
- https://docs.circom.io/getting-started/installation/

```shell

yarn install
# Compile the circuits
cd scripts && ./circuits.sh && cd ./..
# Compile the contracts
yarn hardhat compile
# Run the tests to simulate dumbattle 
yarn hardhat test

# hardhat commands
yarn hardhat help
yarn hardhat test
REPORT_GAS=true yarn hardhat test
yarn hardhat node
yarn hardhat ignition deploy ./ignition/modules/Lock.ts
```
