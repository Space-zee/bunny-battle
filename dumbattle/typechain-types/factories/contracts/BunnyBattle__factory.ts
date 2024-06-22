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
    name: "GameJoined",
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
    name: "MoveSubmitted",
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
            internalType: "address",
            name: "winner",
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
            internalType: "uint256",
            name: "totalBetAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nextMoveDeadline",
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
  "0x60c06040523480156200001157600080fd5b5060405162002d6538038062002d658339818101604052810190620000379190620002b6565b33600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000ad5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620000a491906200030e565b60405180910390fd5b620000be816200012f60201b60201c565b508173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff168152505050506200032b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200022582620001f8565b9050919050565b6000620002398262000218565b9050919050565b6200024b816200022c565b81146200025757600080fd5b50565b6000815190506200026b8162000240565b92915050565b60006200027e8262000218565b9050919050565b620002908162000271565b81146200029c57600080fd5b50565b600081519050620002b08162000285565b92915050565b60008060408385031215620002d057620002cf620001f3565b5b6000620002e0858286016200025a565b9250506020620002f3858286016200029f565b9150509250929050565b620003088162000218565b82525050565b6000602082019050620003256000830184620002fd565b92915050565b60805160a051612a066200035f60003960008181610ff7015261183d01526000818161050301526111470152612a066000f3fe6080604052600436106100c25760003560e01c8063ac744a2c1161007f578063d173bf9c11610059578063d173bf9c1461023a578063f2fde38b14610265578063f8ce31641461028e578063fad99f98146102b9576100c2565b8063ac744a2c146101ab578063ae169a50146101e8578063c894cafe14610211576100c2565b80631ea6beb6146100c7578063453827c6146100e3578063673ee37c1461010e578063715018a6146101395780637d9a69d7146101505780638da5cb5b14610180575b600080fd5b6100e160048036038101906100dc9190611cb6565b6102d0565b005b3480156100ef57600080fd5b506100f8610501565b6040516101059190611da9565b60405180910390f35b34801561011a57600080fd5b50610123610525565b6040516101309190611dd3565b60405180910390f35b34801561014557600080fd5b5061014e61052b565b005b61016a60048036038101906101659190611dee565b61053f565b6040516101779190611dd3565b60405180910390f35b34801561018c57600080fd5b50610195610632565b6040516101a29190611e83565b60405180910390f35b3480156101b757600080fd5b506101d260048036038101906101cd9190611e9e565b61065b565b6040516101df91906120a5565b60405180910390f35b3480156101f457600080fd5b5061020f600480360381019061020a91906120c7565b6108a8565b005b34801561021d57600080fd5b5061023860048036038101906102339190612120565b6109aa565b005b34801561024657600080fd5b5061024f610ff5565b60405161025c91906121db565b60405180910390f35b34801561027157600080fd5b5061028c60048036038101906102879190612222565b611019565b005b34801561029a57600080fd5b506102a361109f565b6040516102b09190611dd3565b60405180910390f35b3480156102c557600080fd5b506102ce6110a5565b005b6001548463ffffffff1610610311576040517fbbec4dc200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600360008663ffffffff16815260200190815260200160002090503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036103b7576040517fb474227200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610441576040517fb474227200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61044c848484611132565b61045b8563ffffffff16611355565b338160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818160040181905550603c426104b4919061227e565b81600801819055508463ffffffff167f45c4f9cbafe186141862608c493f28b823fde4c2142bedc3f5169961a73fdd22336040516104f29190611e83565b60405180910390a25050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60015481565b610533611402565b61053d6000611489565b565b600061054c858585611132565b600060015490506001806000828254610565919061227e565b925050819055506000600360008381526020019081526020016000209050338160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550848160030181905550600081600701819055508381600501819055506105eb82611355565b817f7dfb67e9ff596fca4da65c7eedb128cd1aac553af54b3c0cb733625a2480d8bd338660405161061d9291906122b2565b60405180910390a28192505050949350505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610663611b21565b6001548263ffffffff16106106a4576040517fbbec4dc200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600360008463ffffffff16815260200190815260200160002090506000816007015467ffffffffffffffff8111156106e1576106e06122db565b5b60405190808252806020026020018201604052801561071a57816020015b610707611ba8565b8152602001906001900390816106ff5790505b50905060005b82600701548110156107a65782600901600082815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff16151515158152505082828151811061078e5761078d61230a565b5b60200260200101819052508080600101915050610720565b506040518061010001604052808360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001836003015481526020018360040154815260200183600601548152602001836008015481526020018281525092505050919050565b600060036000838152602001908152602001600020905042816008015411806109225750600073ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b15610959576040517f87d228f600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610963823361154d565b338160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b6001548663ffffffff16106109eb576040517fbbec4dc200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600360008863ffffffff1681526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610a92576040517f68a4ebce00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008160080154118015610aa95750428160080154105b15610ae0576040517f2c5d969600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600081600301549050600060028360070154610afc9190612368565b03610b8f578160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b8a576040517f8c29db9e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c20565b8160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c18576040517f8c29db9e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b816004015490505b600087108015610c31575060038710155b15610c68576040517f66f5040100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600086108015610c79575060038610155b15610cb0576040517fda72af9600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082600701541115610d7857600082600901600060018560070154610cd69190612399565b81526020019081526020016000209050610cfc8686848785600001548660010154611828565b838160020160006101000a81548160ff0219169083151502179055508315610d765782600a0160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190610d70906123cd565b91905055505b505b600282600a0160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403610f0857600060028360070154610dd49190612368565b14610e03578160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610e29565b8160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff165b8260020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610e9f8863ffffffff168360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661154d565b8763ffffffff167ff5d92df6ae1a0b46d0a0c57c2e1da0d75d7591d2804ad086cb1e27ba67de7aaf8360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460070154604051610eff9291906122b2565b60405180910390a25b60405180606001604052808881526020018781526020016000151581525082600901600084600701548152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff0219169083151502179055509050506001826007016000828254610f8b919061227e565b92505081905550603c42610f9f919061227e565b82600801819055508763ffffffff167ff9c787b51d3d2c862fa452a9a2a6c109cbc1c62fe6ea54982e74bc967ccc789933898987604051610fe39493929190612424565b60405180910390a25050505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b611021611402565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036110935760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161108a9190611e83565b60405180910390fd5b61109c81611489565b50565b60025481565b6110ad611402565b60006002549050600081036110ee576040517f969bf72800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6110f83382611a71565b7f812744101ebaaf6b793a9a3057b00dff294aa41e3665594c617fc101fb0387dc816040516111279190611dd3565b60405180910390a150565b600083838101906111439190612577565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166343753b4d6040518060400160405280846000600881106111a05761119f61230a565b5b60200201518152602001846001600881106111be576111bd61230a565b5b602002015181525060405180604001604052806040518060400160405280876002600881106111f0576111ef61230a565b5b602002015181526020018760036008811061120e5761120d61230a565b5b6020020151815250815260200160405180604001604052808760046008811061123a5761123961230a565b5b60200201518152602001876005600881106112585761125761230a565b5b60200201518152508152506040518060400160405280866006600881106112825761128161230a565b5b60200201518152602001866007600881106112a05761129f61230a565b5b60200201518152506040518060200160405280888152506040518563ffffffff1660e01b81526004016112d694939291906127c3565b6020604051808303816000875af11580156112f5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611319919061281f565b61134f576040517f1f21ce1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b6000600360008381526020019081526020016000209050806005015434146113a9576040517f6d14158600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b348160060160008282546113bd919061227e565b92505081905550817f6e9a1c016f5e0e310166cd88e5d74d0ff5c3b973c235306d52d697b7522cb1fc33346040516113f69291906122b2565b60405180910390a25050565b61140a611b19565b73ffffffffffffffffffffffffffffffffffffffff16611428610632565b73ffffffffffffffffffffffffffffffffffffffff16146114875761144b611b19565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161147e9190611e83565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000600360008481526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461164a578060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614611645576040517f93a5f3c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611788565b4281600801541015611787576000600282600701546116699190612368565b036116fc578060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16146116f7576040517f93a5f3c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611786565b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614611785576040517f93a5f3c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b5b600068056bc75e2d63100000670de0b6b3a764000083600601546117ac919061284c565b6117b6919061288e565b905080600260008282546117ca919061227e565b925050819055506117ea838284600601546117e59190612399565b611a71565b837fcbfb271d31de435b2658dcefeb94270068149bf36b21c36d4f48f5ee96d70f048260405161181a9190611dd3565b60405180910390a250505050565b600086868101906118399190612577565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635fe8c13b6040518060400160405280846000600881106118965761189561230a565b5b60200201518152602001846001600881106118b4576118b361230a565b5b602002015181525060405180604001604052806040518060400160405280876002600881106118e6576118e561230a565b5b60200201518152602001876003600881106119045761190361230a565b5b602002015181525081526020016040518060400160405280876004600881106119305761192f61230a565b5b602002015181526020018760056008811061194e5761194d61230a565b5b60200201518152508152506040518060400160405280866006600881106119785761197761230a565b5b60200201518152602001866007600881106119965761199561230a565b5b602002015181525060405180608001604052808a6119b55760006119b8565b60015b60ff1681526020018b8152602001898152602001888152506040518563ffffffff1660e01b81526004016119ef9493929190612943565b6020604051808303816000875af1158015611a0e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a32919061281f565b611a68576040517f2b5e157a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050505050565b60008273ffffffffffffffffffffffffffffffffffffffff1682604051611a97906129bb565b60006040518083038185875af1925050503d8060008114611ad4576040519150601f19603f3d011682016040523d82523d6000602084013e611ad9565b606091505b5050905080611b14576040517fa9c98a4b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b600033905090565b604051806101000160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081526020016000815260200160008152602001606081525090565b604051806060016040528060008152602001600081526020016000151581525090565b6000604051905090565b600080fd5b600080fd5b600063ffffffff82169050919050565b611bf881611bdf565b8114611c0357600080fd5b50565b600081359050611c1581611bef565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112611c4057611c3f611c1b565b5b8235905067ffffffffffffffff811115611c5d57611c5c611c20565b5b602083019150836001820283011115611c7957611c78611c25565b5b9250929050565b6000819050919050565b611c9381611c80565b8114611c9e57600080fd5b50565b600081359050611cb081611c8a565b92915050565b60008060008060608587031215611cd057611ccf611bd5565b5b6000611cde87828801611c06565b945050602085013567ffffffffffffffff811115611cff57611cfe611bda565b5b611d0b87828801611c2a565b93509350506040611d1e87828801611ca1565b91505092959194509250565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000611d6f611d6a611d6584611d2a565b611d4a565b611d2a565b9050919050565b6000611d8182611d54565b9050919050565b6000611d9382611d76565b9050919050565b611da381611d88565b82525050565b6000602082019050611dbe6000830184611d9a565b92915050565b611dcd81611c80565b82525050565b6000602082019050611de86000830184611dc4565b92915050565b60008060008060608587031215611e0857611e07611bd5565b5b600085013567ffffffffffffffff811115611e2657611e25611bda565b5b611e3287828801611c2a565b94509450506020611e4587828801611ca1565b9250506040611e5687828801611ca1565b91505092959194509250565b6000611e6d82611d2a565b9050919050565b611e7d81611e62565b82525050565b6000602082019050611e986000830184611e74565b92915050565b600060208284031215611eb457611eb3611bd5565b5b6000611ec284828501611c06565b91505092915050565b611ed481611e62565b82525050565b611ee381611c80565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b611f2a81611f15565b82525050565b606082016000820151611f466000850182611eda565b506020820151611f596020850182611eda565b506040820151611f6c6040850182611f21565b50505050565b6000611f7e8383611f30565b60608301905092915050565b6000602082019050919050565b6000611fa282611ee9565b611fac8185611ef4565b9350611fb783611f05565b8060005b83811015611fe8578151611fcf8882611f72565b9750611fda83611f8a565b925050600181019050611fbb565b5085935050505092915050565b60006101008301600083015161200e6000860182611ecb565b5060208301516120216020860182611ecb565b5060408301516120346040860182611ecb565b5060608301516120476060860182611eda565b50608083015161205a6080860182611eda565b5060a083015161206d60a0860182611eda565b5060c083015161208060c0860182611eda565b5060e083015184820360e08601526120988282611f97565b9150508091505092915050565b600060208201905081810360008301526120bf8184611ff5565b905092915050565b6000602082840312156120dd576120dc611bd5565b5b60006120eb84828501611ca1565b91505092915050565b6120fd81611f15565b811461210857600080fd5b50565b60008135905061211a816120f4565b92915050565b60008060008060008060a0878903121561213d5761213c611bd5565b5b600061214b89828a01611c06565b965050602061215c89828a01611ca1565b955050604061216d89828a01611ca1565b945050606087013567ffffffffffffffff81111561218e5761218d611bda565b5b61219a89828a01611c2a565b935093505060806121ad89828a0161210b565b9150509295509295509295565b60006121c582611d76565b9050919050565b6121d5816121ba565b82525050565b60006020820190506121f060008301846121cc565b92915050565b6121ff81611e62565b811461220a57600080fd5b50565b60008135905061221c816121f6565b92915050565b60006020828403121561223857612237611bd5565b5b60006122468482850161220d565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061228982611c80565b915061229483611c80565b92508282019050808211156122ac576122ab61224f565b5b92915050565b60006040820190506122c76000830185611e74565b6122d46020830184611dc4565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061237382611c80565b915061237e83611c80565b92508261238e5761238d612339565b5b828206905092915050565b60006123a482611c80565b91506123af83611c80565b92508282039050818111156123c7576123c661224f565b5b92915050565b60006123d882611c80565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361240a5761240961224f565b5b600182019050919050565b61241e81611f15565b82525050565b60006080820190506124396000830187611e74565b6124466020830186611dc4565b6124536040830185611dc4565b6124606060830184612415565b95945050505050565b6000601f19601f8301169050919050565b61248382612469565b810181811067ffffffffffffffff821117156124a2576124a16122db565b5b80604052505050565b60006124b5611bcb565b90506124c1828261247a565b919050565b600067ffffffffffffffff8211156124e1576124e06122db565b5b602082029050919050565b60006124ff6124fa846124c6565b6124ab565b9050806020840283018581111561251957612518611c25565b5b835b81811015612542578061252e8882611ca1565b84526020840193505060208101905061251b565b5050509392505050565b600082601f83011261256157612560611c1b565b5b600861256e8482856124ec565b91505092915050565b6000610100828403121561258e5761258d611bd5565b5b600061259c8482850161254c565b91505092915050565b600060029050919050565b600081905092915050565b6000819050919050565b60006125d18383611eda565b60208301905092915050565b6000602082019050919050565b6125f3816125a5565b6125fd81846125b0565b9250612608826125bb565b8060005b8381101561263957815161262087826125c5565b965061262b836125dd565b92505060018101905061260c565b505050505050565b600060029050919050565b600081905092915050565b6000819050919050565b600081905092915050565b612675816125a5565b61267f8184612661565b925061268a826125bb565b8060005b838110156126bb5781516126a287826125c5565b96506126ad836125dd565b92505060018101905061268e565b505050505050565b60006126cf838361266c565b60408301905092915050565b6000602082019050919050565b6126f181612641565b6126fb818461264c565b925061270682612657565b8060005b8381101561273757815161271e87826126c3565b9650612729836126db565b92505060018101905061270a565b505050505050565b600060019050919050565b600081905092915050565b6000819050919050565b6000602082019050919050565b6127758161273f565b61277f818461274a565b925061278a82612755565b8060005b838110156127bb5781516127a287826125c5565b96506127ad8361275f565b92505060018101905061278e565b505050505050565b6000610120820190506127d960008301876125ea565b6127e660408301866126e8565b6127f360c08301856125ea565b61280161010083018461276c565b95945050505050565b600081519050612819816120f4565b92915050565b60006020828403121561283557612834611bd5565b5b60006128438482850161280a565b91505092915050565b600061285782611c80565b915061286283611c80565b925082820261287081611c80565b915082820484148315176128875761288661224f565b5b5092915050565b600061289982611c80565b91506128a483611c80565b9250826128b4576128b3612339565b5b828204905092915050565b600060049050919050565b600081905092915050565b6000819050919050565b6000602082019050919050565b6128f5816128bf565b6128ff81846128ca565b925061290a826128d5565b8060005b8381101561293b57815161292287826125c5565b965061292d836128df565b92505060018101905061290e565b505050505050565b60006101808201905061295960008301876125ea565b61296660408301866126e8565b61297360c08301856125ea565b6129816101008301846128ec565b95945050505050565b600081905092915050565b50565b60006129a560008361298a565b91506129b082612995565b600082019050919050565b60006129c682612998565b915081905091905056fea26469706673582212203c409dc3740d2fd84b954b732cd4a397a297fc6fe6fdd87b5963f8ca3fa5865664736f6c63430008180033";

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
