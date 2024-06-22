/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  Groth16Verifier,
  Groth16VerifierInterface,
} from "../../../contracts/moveVerifier.sol/Groth16Verifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "_pA",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "_pB",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "_pC",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[4]",
        name: "_pubSignals",
        type: "uint256[4]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610725806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80635fe8c13b14610030575b600080fd5b61004a60048036038101906100459190610650565b610060565b60405161005791906106d4565b60405180910390f35b600061057d565b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018110610098576000805260206000f35b50565b600060405183815284602082015285604082015260408160608360076107d05a03fa9150816100ce576000805260206000f35b825160408201526020830151606082015260408360808360066107d05a03fa9150816100fe576000805260206000f35b505050505050565b600060808601600087017f26e7b5d575c1a368bddc46e1a0bfceee2d5eaaa7ebc6bafe19fcfb84c93d29b481527f0d8630affcfda04ca26a5ac45795f8ce6d2c18808297b1bb772fc0a6d592adde60208201526101a960008801357f1be24fb35d8bbc6b62c44be9923195e785d8b6e5a59791dc061a3c985258afe47f2c983c55abeac3e6ad16cf7048b70ab8f046896baef4886fc8501887041797688461009b565b6101f960208801357f14b05ffa6df8f58f2bcc09a3b1f6b1b0197e68b9910f221437823f375d0ca2887f1e11460f4907c765230801e22b865e74d03332359b188a554f1cf2ec34c1ea548461009b565b61024960408801357f1608f95164d6911048d9ada9b9ff08c8788a77b1786a8789602316f9f2eca8567f0531774c963f76d40cd75849af4344391e00a0dae1f545cf136e22f31aa5724e8461009b565b61029960608801357f034e0c005a8dab6e018e4c6e17e0951e27a239009c638c3d10d7f44a8f297f697f2077ecef3af7b90dd5bbf7e2acbf53d2c45efa53fe589440de37047894159d2e8461009b565b833582527f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4760208501357f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4703066020830152843560408301526020850135606083015260408501356080830152606085013560a08301527f2e6687e4504e3e7e55678c7141b2ab1563798bf411d39a4915d89dc4cd440e9a60c08301527f0f1ca893e15dc49eb1d4a0bcbe9338a0986ad13206cf5ef81c806582f9cc404c60e08301527f1b1c5497d7dab5f89957c5ef8b5bca3d38c9fbaaade50ff8e6d17271dcda43006101008301527f1fd6db1a079b82b13e0a7a2ca6ebcb67c5de5138e777071d8d4cb39999c1ce8c6101208301527f2cb50dd350428728d1c000cf807bd813113b726f97f8d26207e525a77a8a14f26101408301527f3036b329131d4ed466d808229f75fd632c6897cb8ff8d46171123fd6c57265c5610160830152600088015161018083015260206000018801516101a08301527f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c26101c08301527f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed6101e08301527f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b6102008301527f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa610220830152853561024083015260208601356102608301527f0cc2dd36b778d24275504c307939f8b961865a0a9a0b81e3fbf055ef86c42c816102808301527f0caf93442ffc23e6172f90e7bcb798900c6f3ec65f3b2ea3db0a296acc17fd0d6102a08301527f13bd40774b9828ee4fa52b98c8517eebc7609f08a0ce9755dbd3d9bd09ba68ec6102c08301527f0bd4136351cb276ebb765722f6e783b66cb0deb530082ae1f82f70415b6f117d6102e08301526020826103008460086107d05a03fa82518116935050505095945050505050565b60405161038081016040526105956000840135610067565b6105a26020840135610067565b6105af6040840135610067565b6105bc6060840135610067565b6105c96080840135610067565b6105d6818486888a610106565b8060005260206000f35b600080fd5b600080fd5b600081905082602060020282011115610606576106056105e5565b5b92915050565b600081905082604060020282011115610628576106276105e5565b5b92915050565b60008190508260206004028201111561064a576106496105e5565b5b92915050565b600080600080610180858703121561066b5761066a6105e0565b5b6000610679878288016105ea565b945050604061068a8782880161060c565b93505060c061069b878288016105ea565b9250506101006106ad8782880161062e565b91505092959194509250565b60008115159050919050565b6106ce816106b9565b82525050565b60006020820190506106e960008301846106c5565b9291505056fea2646970667358221220c0bb73b33811c3268267a24d551ea907d89b7321ae8be8d472ffe699f16d941264736f6c63430008180033";

type Groth16VerifierConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Groth16VerifierConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Groth16Verifier__factory extends ContractFactory {
  constructor(...args: Groth16VerifierConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Groth16Verifier & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Groth16Verifier__factory {
    return super.connect(runner) as Groth16Verifier__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Groth16VerifierInterface {
    return new Interface(_abi) as Groth16VerifierInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): Groth16Verifier {
    return new Contract(address, _abi, runner) as unknown as Groth16Verifier;
  }
}