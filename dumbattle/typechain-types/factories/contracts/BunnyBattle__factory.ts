/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  BunnyBattle,
  BunnyBattleInterface,
} from "../../contracts/BunnyBattle";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ICreateVerifier",
        name: "_createVerifier",
        type: "address",
      },
      {
        internalType: "contract IMoveVerifier",
        name: "_moveVerifier",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FailedEtherSend",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedToClaimReward",
    type: "error",
  },
  {
    inputs: [],
    name: "GameIsFinished",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectBetAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBoardStateZK",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidGameID",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMoveX",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMoveY",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMoveZK",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTurn",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidWinner",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAllowedJoinGame",
    type: "error",
  },
  {
    inputs: [],
    name: "NothingToClaim",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "TechnicalLose",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "commission",
        type: "uint256",
      },
    ],
    name: "CommissionAccumulated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "accumulatedFee",
        type: "uint256",
      },
    ],
    name: "CommissionClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
    ],
    name: "EtherDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "moveSize",
        type: "uint256",
      },
    ],
    name: "GameFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "GameJoint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_moveX",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_moveY",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPreviousMoveAHit",
        type: "bool",
      },
    ],
    name: "MoveSubmited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "accumulatedFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimCommission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameID",
        type: "uint256",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_boardHash",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_betAmount",
        type: "uint256",
      },
    ],
    name: "createGame",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "createVerifier",
    outputs: [
      {
        internalType: "contract ICreateVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_gameID",
        type: "uint32",
      },
    ],
    name: "game",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "player1",
            type: "address",
          },
          {
            internalType: "address",
            name: "player2",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "player1Hash",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "player2Hash",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "x",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "y",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "isHit",
                type: "bool",
              },
            ],
            internalType: "struct IBunnyBattle.Move[]",
            name: "moves",
            type: "tuple[]",
          },
        ],
        internalType: "struct IBunnyBattle.GamePublicMetadata",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_gameID",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_boardHash",
        type: "uint256",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "moveVerifier",
    outputs: [
      {
        internalType: "contract IMoveVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextGameID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_gameID",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_moveX",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_moveY",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "isPreviousMoveAHit",
        type: "bool",
      },
    ],
    name: "submitMove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c06040523480156200001157600080fd5b5060405162002dae38038062002dae8339818101604052810190620000379190620002b6565b33600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000ad5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620000a491906200030e565b60405180910390fd5b620000be816200012f60201b60201c565b508173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff168152505050506200032b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200022582620001f8565b9050919050565b6000620002398262000218565b9050919050565b6200024b816200022c565b81146200025757600080fd5b50565b6000815190506200026b8162000240565b92915050565b60006200027e8262000218565b9050919050565b620002908162000271565b81146200029c57600080fd5b50565b600081519050620002b08162000285565b92915050565b60008060408385031215620002d057620002cf620001f3565b5b6000620002e0858286016200025a565b9250506020620002f3858286016200029f565b9150509250929050565b620003088162000218565b82525050565b6000602082019050620003256000830184620002fd565b92915050565b60805160a051612a4f6200035f6000396000818161100c01526118ec0152600081816104ee015261115c0152612a4f6000f3fe6080604052600436106100c25760003560e01c8063ac744a2c1161007f578063d173bf9c11610059578063d173bf9c1461023a578063f2fde38b14610265578063f8ce31641461028e578063fad99f98146102b9576100c2565b8063ac744a2c146101ab578063ae169a50146101e8578063c894cafe14610211576100c2565b80631ea6beb6146100c7578063453827c6146100e3578063673ee37c1461010e578063715018a6146101395780637d9a69d7146101505780638da5cb5b14610180575b600080fd5b6100e160048036038101906100dc9190611d39565b6102d0565b005b3480156100ef57600080fd5b506100f86104ec565b6040516101059190611e2c565b60405180910390f35b34801561011a57600080fd5b50610123610510565b6040516101309190611e56565b60405180910390f35b34801561014557600080fd5b5061014e610516565b005b61016a60048036038101906101659190611e71565b61052a565b6040516101779190611e56565b60405180910390f35b34801561018c57600080fd5b5061019561061d565b6040516101a29190611f06565b60405180910390f35b3480156101b757600080fd5b506101d260048036038101906101cd9190611f21565b610646565b6040516101df91906120ee565b60405180910390f35b3480156101f457600080fd5b5061020f600480360381019061020a9190612110565b61083e565b005b34801561021d57600080fd5b5061023860048036038101906102339190612169565b6108fe565b005b34801561024657600080fd5b5061024f61100a565b60405161025c9190612224565b60405180910390f35b34801561027157600080fd5b5061028c6004803603810190610287919061226b565b61102e565b005b34801561029a57600080fd5b506102a36110b4565b6040516102b09190611e56565b60405180910390f35b3480156102c557600080fd5b506102ce6110ba565b005b6001548463ffffffff1610610311576040517fbbec4dc200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600360008663ffffffff16815260200190815260200160002090503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036103b7576040517fb474227200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610441576040517fb474227200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61044c848484611147565b61045b8563ffffffff1661136a565b338160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508181600401819055508463ffffffff167fdb261431fd1cc4745debbecc52626c39a73a886d35bbeca520abb2e87c57a9f0336040516104dd9190611f06565b60405180910390a25050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60015481565b61051e611417565b610528600061149e565b565b6000610537858585611147565b60006001549050600180600082825461055091906122c7565b925050819055506000600360008381526020019081526020016000209050338160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550848160030181905550600081600701819055508381600501819055506105d68261136a565b817f7dfb67e9ff596fca4da65c7eedb128cd1aac553af54b3c0cb733625a2480d8bd33866040516106089291906122fb565b60405180910390a28192505050949350505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61064e611bd0565b6001548263ffffffff161061068f576040517fbbec4dc200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600360008463ffffffff16815260200190815260200160002090506000816007015467ffffffffffffffff8111156106cc576106cb612324565b5b60405190808252806020026020018201604052801561070557816020015b6106f2611c2b565b8152602001906001900390816106ea5790505b50905060005b82600701548110156107915782600901600082815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff16151515158152505082828151811061077957610778612353565b5b6020026020010181905250808060010191505061070b565b506040518060a001604052808360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183600301548152602001836004015481526020018281525092505050919050565b60006003600083815260200190815260200160002090504281600801541115806108b95750600073ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b156108f0576040517f87d228f600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108fa8233611562565b5050565b6001548663ffffffff161061093f576040517fbbec4dc200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600360008863ffffffff1681526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109e6576040517f68a4ebce00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b4281600801541115610a24576040517f2c5d969600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600081600301549050600060028360070154610a4091906123b1565b03610ad3578160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ace576040517f8c29db9e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610b64565b8160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b5c576040517f8c29db9e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b816004015490505b600087108015610b745750600387115b15610bab576040517f66f5040100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600086108015610bbb5750600386115b15610bf2576040517fda72af9600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082600701541115610d2057600082600901600060018560070154610c1891906123e2565b81526020019081526020016000209050610c3e86868487856000015486600101546118d7565b838160020160006101000a81548160ff0219169083151502179055508315610d1e5782600a0160008060028660070154610c7891906123b1565b14610ca7578460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610ccd565b8460010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff165b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190610d1890612416565b91905055505b505b600282600a0160008060028660070154610d3a91906123b1565b14610d69578460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610d8f565b8460010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff165b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403610f1657600060028360070154610de291906123b1565b14610e11578160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610e37565b8160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff165b8260020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610ead8863ffffffff168360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611562565b8763ffffffff167ff5d92df6ae1a0b46d0a0c57c2e1da0d75d7591d2804ad086cb1e27ba67de7aaf8360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460070154604051610f0d9291906122fb565b60405180910390a25b60405180606001604052808881526020018781526020016000151581525082600901600084600701548152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff0219169083151502179055509050506001826007016000828254610f9991906122c7565b92505081905550603c826008016000828254610fb591906122c7565b925050819055508763ffffffff167f960b63af16691ff2d5fd5f08c1b3c7fa2bc440bd70e739416759adec0f0b2b6633898987604051610ff8949392919061246d565b60405180910390a25050505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b611036611417565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036110a85760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161109f9190611f06565b60405180910390fd5b6110b18161149e565b50565b60025481565b6110c2611417565b6000600254905060008103611103576040517f969bf72800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61110d3382611b20565b7f812744101ebaaf6b793a9a3057b00dff294aa41e3665594c617fc101fb0387dc8160405161113c9190611e56565b60405180910390a150565b6000838381019061115891906125c0565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166343753b4d6040518060400160405280846000600881106111b5576111b4612353565b5b60200201518152602001846001600881106111d3576111d2612353565b5b6020020151815250604051806040016040528060405180604001604052808760026008811061120557611204612353565b5b602002015181526020018760036008811061122357611222612353565b5b6020020151815250815260200160405180604001604052808760046008811061124f5761124e612353565b5b602002015181526020018760056008811061126d5761126c612353565b5b602002015181525081525060405180604001604052808660066008811061129757611296612353565b5b60200201518152602001866007600881106112b5576112b4612353565b5b60200201518152506040518060200160405280888152506040518563ffffffff1660e01b81526004016112eb949392919061280c565b6020604051808303816000875af115801561130a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061132e9190612868565b611364576040517f1f21ce1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b6000600360008381526020019081526020016000209050806005015434146113be576040517f6d14158600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b348160060160008282546113d291906122c7565b92505081905550817f6e9a1c016f5e0e310166cd88e5d74d0ff5c3b973c235306d52d697b7522cb1fc333460405161140b9291906122fb565b60405180910390a25050565b61141f611bc8565b73ffffffffffffffffffffffffffffffffffffffff1661143d61061d565b73ffffffffffffffffffffffffffffffffffffffff161461149c57611460611bc8565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016114939190611f06565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000600360008481526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461165f578060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161461165a576040517f93a5f3c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611838565b60008160070154036116f9578060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16146116f4576040517f93a5f3c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611837565b42816008015411156118365760006002826007015461171891906123b1565b036117ab578060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16146117a6576040517f93a5f3c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611835565b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614611834576040517f93a5f3c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b5b5b600068056bc75e2d6310000066038d7ea4c68000836006015461185b9190612895565b61186591906128d7565b9050806002600082825461187991906122c7565b925050819055506118993382846006015461189491906123e2565b611b20565b837fcbfb271d31de435b2658dcefeb94270068149bf36b21c36d4f48f5ee96d70f04826040516118c99190611e56565b60405180910390a250505050565b600086868101906118e891906125c0565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635fe8c13b60405180604001604052808460006008811061194557611944612353565b5b602002015181526020018460016008811061196357611962612353565b5b6020020151815250604051806040016040528060405180604001604052808760026008811061199557611994612353565b5b60200201518152602001876003600881106119b3576119b2612353565b5b602002015181525081526020016040518060400160405280876004600881106119df576119de612353565b5b60200201518152602001876005600881106119fd576119fc612353565b5b6020020151815250815250604051806040016040528086600660088110611a2757611a26612353565b5b6020020151815260200186600760088110611a4557611a44612353565b5b602002015181525060405180608001604052808a611a64576000611a67565b60015b60ff1681526020018b8152602001898152602001888152506040518563ffffffff1660e01b8152600401611a9e949392919061298c565b6020604051808303816000875af1158015611abd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ae19190612868565b611b17576040517f2b5e157a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050505050565b60008273ffffffffffffffffffffffffffffffffffffffff1682604051611b4690612a04565b60006040518083038185875af1925050503d8060008114611b83576040519150601f19603f3d011682016040523d82523d6000602084013e611b88565b606091505b5050905080611bc3576040517fa9c98a4b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b600033905090565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001606081525090565b604051806060016040528060008152602001600081526020016000151581525090565b6000604051905090565b600080fd5b600080fd5b600063ffffffff82169050919050565b611c7b81611c62565b8114611c8657600080fd5b50565b600081359050611c9881611c72565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112611cc357611cc2611c9e565b5b8235905067ffffffffffffffff811115611ce057611cdf611ca3565b5b602083019150836001820283011115611cfc57611cfb611ca8565b5b9250929050565b6000819050919050565b611d1681611d03565b8114611d2157600080fd5b50565b600081359050611d3381611d0d565b92915050565b60008060008060608587031215611d5357611d52611c58565b5b6000611d6187828801611c89565b945050602085013567ffffffffffffffff811115611d8257611d81611c5d565b5b611d8e87828801611cad565b93509350506040611da187828801611d24565b91505092959194509250565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000611df2611ded611de884611dad565b611dcd565b611dad565b9050919050565b6000611e0482611dd7565b9050919050565b6000611e1682611df9565b9050919050565b611e2681611e0b565b82525050565b6000602082019050611e416000830184611e1d565b92915050565b611e5081611d03565b82525050565b6000602082019050611e6b6000830184611e47565b92915050565b60008060008060608587031215611e8b57611e8a611c58565b5b600085013567ffffffffffffffff811115611ea957611ea8611c5d565b5b611eb587828801611cad565b94509450506020611ec887828801611d24565b9250506040611ed987828801611d24565b91505092959194509250565b6000611ef082611dad565b9050919050565b611f0081611ee5565b82525050565b6000602082019050611f1b6000830184611ef7565b92915050565b600060208284031215611f3757611f36611c58565b5b6000611f4584828501611c89565b91505092915050565b611f5781611ee5565b82525050565b611f6681611d03565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b611fad81611f98565b82525050565b606082016000820151611fc96000850182611f5d565b506020820151611fdc6020850182611f5d565b506040820151611fef6040850182611fa4565b50505050565b60006120018383611fb3565b60608301905092915050565b6000602082019050919050565b600061202582611f6c565b61202f8185611f77565b935061203a83611f88565b8060005b8381101561206b5781516120528882611ff5565b975061205d8361200d565b92505060018101905061203e565b5085935050505092915050565b600060a0830160008301516120906000860182611f4e565b5060208301516120a36020860182611f4e565b5060408301516120b66040860182611f5d565b5060608301516120c96060860182611f5d565b50608083015184820360808601526120e1828261201a565b9150508091505092915050565b600060208201905081810360008301526121088184612078565b905092915050565b60006020828403121561212657612125611c58565b5b600061213484828501611d24565b91505092915050565b61214681611f98565b811461215157600080fd5b50565b6000813590506121638161213d565b92915050565b60008060008060008060a0878903121561218657612185611c58565b5b600061219489828a01611c89565b96505060206121a589828a01611d24565b95505060406121b689828a01611d24565b945050606087013567ffffffffffffffff8111156121d7576121d6611c5d565b5b6121e389828a01611cad565b935093505060806121f689828a01612154565b9150509295509295509295565b600061220e82611df9565b9050919050565b61221e81612203565b82525050565b60006020820190506122396000830184612215565b92915050565b61224881611ee5565b811461225357600080fd5b50565b6000813590506122658161223f565b92915050565b60006020828403121561228157612280611c58565b5b600061228f84828501612256565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006122d282611d03565b91506122dd83611d03565b92508282019050808211156122f5576122f4612298565b5b92915050565b60006040820190506123106000830185611ef7565b61231d6020830184611e47565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006123bc82611d03565b91506123c783611d03565b9250826123d7576123d6612382565b5b828206905092915050565b60006123ed82611d03565b91506123f883611d03565b92508282039050818111156124105761240f612298565b5b92915050565b600061242182611d03565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361245357612452612298565b5b600182019050919050565b61246781611f98565b82525050565b60006080820190506124826000830187611ef7565b61248f6020830186611e47565b61249c6040830185611e47565b6124a9606083018461245e565b95945050505050565b6000601f19601f8301169050919050565b6124cc826124b2565b810181811067ffffffffffffffff821117156124eb576124ea612324565b5b80604052505050565b60006124fe611c4e565b905061250a82826124c3565b919050565b600067ffffffffffffffff82111561252a57612529612324565b5b602082029050919050565b60006125486125438461250f565b6124f4565b9050806020840283018581111561256257612561611ca8565b5b835b8181101561258b57806125778882611d24565b845260208401935050602081019050612564565b5050509392505050565b600082601f8301126125aa576125a9611c9e565b5b60086125b7848285612535565b91505092915050565b600061010082840312156125d7576125d6611c58565b5b60006125e584828501612595565b91505092915050565b600060029050919050565b600081905092915050565b6000819050919050565b600061261a8383611f5d565b60208301905092915050565b6000602082019050919050565b61263c816125ee565b61264681846125f9565b925061265182612604565b8060005b83811015612682578151612669878261260e565b965061267483612626565b925050600181019050612655565b505050505050565b600060029050919050565b600081905092915050565b6000819050919050565b600081905092915050565b6126be816125ee565b6126c881846126aa565b92506126d382612604565b8060005b838110156127045781516126eb878261260e565b96506126f683612626565b9250506001810190506126d7565b505050505050565b600061271883836126b5565b60408301905092915050565b6000602082019050919050565b61273a8161268a565b6127448184612695565b925061274f826126a0565b8060005b83811015612780578151612767878261270c565b965061277283612724565b925050600181019050612753565b505050505050565b600060019050919050565b600081905092915050565b6000819050919050565b6000602082019050919050565b6127be81612788565b6127c88184612793565b92506127d38261279e565b8060005b838110156128045781516127eb878261260e565b96506127f6836127a8565b9250506001810190506127d7565b505050505050565b6000610120820190506128226000830187612633565b61282f6040830186612731565b61283c60c0830185612633565b61284a6101008301846127b5565b95945050505050565b6000815190506128628161213d565b92915050565b60006020828403121561287e5761287d611c58565b5b600061288c84828501612853565b91505092915050565b60006128a082611d03565b91506128ab83611d03565b92508282026128b981611d03565b915082820484148315176128d0576128cf612298565b5b5092915050565b60006128e282611d03565b91506128ed83611d03565b9250826128fd576128fc612382565b5b828204905092915050565b600060049050919050565b600081905092915050565b6000819050919050565b6000602082019050919050565b61293e81612908565b6129488184612913565b92506129538261291e565b8060005b8381101561298457815161296b878261260e565b965061297683612928565b925050600181019050612957565b505050505050565b6000610180820190506129a26000830187612633565b6129af6040830186612731565b6129bc60c0830185612633565b6129ca610100830184612935565b95945050505050565b600081905092915050565b50565b60006129ee6000836129d3565b91506129f9826129de565b600082019050919050565b6000612a0f826129e1565b915081905091905056fea26469706673582212200bc66d07bce15e601966f93944157318e1e9aeef28a1ae9aefd8d7c3dc67d75964736f6c63430008180033";

type BunnyBattleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BunnyBattleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BunnyBattle__factory extends ContractFactory {
  constructor(...args: BunnyBattleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _createVerifier: AddressLike,
    _moveVerifier: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _createVerifier,
      _moveVerifier,
      overrides || {}
    );
  }
  override deploy(
    _createVerifier: AddressLike,
    _moveVerifier: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _createVerifier,
      _moveVerifier,
      overrides || {}
    ) as Promise<
      BunnyBattle & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BunnyBattle__factory {
    return super.connect(runner) as BunnyBattle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BunnyBattleInterface {
    return new Interface(_abi) as BunnyBattleInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): BunnyBattle {
    return new Contract(address, _abi, runner) as unknown as BunnyBattle;
  }
}
