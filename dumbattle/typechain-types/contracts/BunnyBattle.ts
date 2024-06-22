/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace IBunnyBattle {
  export type MoveStruct = { x: BigNumberish; y: BigNumberish; isHit: boolean };

  export type MoveStructOutput = [x: bigint, y: bigint, isHit: boolean] & {
    x: bigint;
    y: bigint;
    isHit: boolean;
  };

  export type GamePublicMetadataStruct = {
    player1: AddressLike;
    player2: AddressLike;
    winner: AddressLike;
    player1Hash: BigNumberish;
    player2Hash: BigNumberish;
    nextMoveDeadline: BigNumberish;
    totalBetAmount: BigNumberish;
    moves: IBunnyBattle.MoveStruct[];
  };

  export type GamePublicMetadataStructOutput = [
    player1: string,
    player2: string,
    winner: string,
    player1Hash: bigint,
    player2Hash: bigint,
    nextMoveDeadline: bigint,
    totalBetAmount: bigint,
    moves: IBunnyBattle.MoveStructOutput[]
  ] & {
    player1: string;
    player2: string;
    winner: string;
    player1Hash: bigint;
    player2Hash: bigint;
    nextMoveDeadline: bigint;
    totalBetAmount: bigint;
    moves: IBunnyBattle.MoveStructOutput[];
  };
}

export interface BunnyBattleInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "accumulatedFee"
      | "claimCommission"
      | "claimReward"
      | "createGame"
      | "createVerifier"
      | "game"
      | "joinGame"
      | "moveVerifier"
      | "nextGameID"
      | "owner"
      | "renounceOwnership"
      | "submitMove"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "CommissionAccumulated"
      | "CommissionClaimed"
      | "EtherDeposited"
      | "GameCreated"
      | "GameFinished"
      | "GameJoined"
      | "MoveSubmitted"
      | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "accumulatedFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimCommission",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createGame",
    values: [BytesLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createVerifier",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "game", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "joinGame",
    values: [BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "moveVerifier",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nextGameID",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "submitMove",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "accumulatedFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimCommission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "game", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "joinGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "moveVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nextGameID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "submitMove", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace CommissionAccumulatedEvent {
  export type InputTuple = [gameId: BigNumberish, commission: BigNumberish];
  export type OutputTuple = [gameId: bigint, commission: bigint];
  export interface OutputObject {
    gameId: bigint;
    commission: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CommissionClaimedEvent {
  export type InputTuple = [accumulatedFee: BigNumberish];
  export type OutputTuple = [accumulatedFee: bigint];
  export interface OutputObject {
    accumulatedFee: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EtherDepositedEvent {
  export type InputTuple = [
    gameId: BigNumberish,
    participant: AddressLike,
    betAmount: BigNumberish
  ];
  export type OutputTuple = [
    gameId: bigint,
    participant: string,
    betAmount: bigint
  ];
  export interface OutputObject {
    gameId: bigint;
    participant: string;
    betAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameCreatedEvent {
  export type InputTuple = [
    gameId: BigNumberish,
    creator: AddressLike,
    betAmount: BigNumberish
  ];
  export type OutputTuple = [
    gameId: bigint,
    creator: string,
    betAmount: bigint
  ];
  export interface OutputObject {
    gameId: bigint;
    creator: string;
    betAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameFinishedEvent {
  export type InputTuple = [
    gameId: BigNumberish,
    winner: AddressLike,
    moveSize: BigNumberish
  ];
  export type OutputTuple = [gameId: bigint, winner: string, moveSize: bigint];
  export interface OutputObject {
    gameId: bigint;
    winner: string;
    moveSize: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameJoinedEvent {
  export type InputTuple = [gameId: BigNumberish, participant: AddressLike];
  export type OutputTuple = [gameId: bigint, participant: string];
  export interface OutputObject {
    gameId: bigint;
    participant: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MoveSubmittedEvent {
  export type InputTuple = [
    gameId: BigNumberish,
    participant: AddressLike,
    _moveX: BigNumberish,
    _moveY: BigNumberish,
    isPreviousMoveAHit: boolean
  ];
  export type OutputTuple = [
    gameId: bigint,
    participant: string,
    _moveX: bigint,
    _moveY: bigint,
    isPreviousMoveAHit: boolean
  ];
  export interface OutputObject {
    gameId: bigint;
    participant: string;
    _moveX: bigint;
    _moveY: bigint;
    isPreviousMoveAHit: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BunnyBattle extends BaseContract {
  connect(runner?: ContractRunner | null): BunnyBattle;
  waitForDeployment(): Promise<this>;

  interface: BunnyBattleInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  accumulatedFee: TypedContractMethod<[], [bigint], "view">;

  claimCommission: TypedContractMethod<[], [void], "nonpayable">;

  claimReward: TypedContractMethod<
    [_gameID: BigNumberish],
    [void],
    "nonpayable"
  >;

  createGame: TypedContractMethod<
    [_proof: BytesLike, _boardHash: BigNumberish, _betAmount: BigNumberish],
    [bigint],
    "payable"
  >;

  createVerifier: TypedContractMethod<[], [string], "view">;

  game: TypedContractMethod<
    [_gameID: BigNumberish],
    [IBunnyBattle.GamePublicMetadataStructOutput],
    "view"
  >;

  joinGame: TypedContractMethod<
    [_gameID: BigNumberish, _proof: BytesLike, _boardHash: BigNumberish],
    [void],
    "payable"
  >;

  moveVerifier: TypedContractMethod<[], [string], "view">;

  nextGameID: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  submitMove: TypedContractMethod<
    [
      _gameID: BigNumberish,
      _moveX: BigNumberish,
      _moveY: BigNumberish,
      _proof: BytesLike,
      isPreviousMoveAHit: boolean
    ],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "accumulatedFee"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "claimCommission"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "claimReward"
  ): TypedContractMethod<[_gameID: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createGame"
  ): TypedContractMethod<
    [_proof: BytesLike, _boardHash: BigNumberish, _betAmount: BigNumberish],
    [bigint],
    "payable"
  >;
  getFunction(
    nameOrSignature: "createVerifier"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "game"
  ): TypedContractMethod<
    [_gameID: BigNumberish],
    [IBunnyBattle.GamePublicMetadataStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "joinGame"
  ): TypedContractMethod<
    [_gameID: BigNumberish, _proof: BytesLike, _boardHash: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "moveVerifier"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "nextGameID"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "submitMove"
  ): TypedContractMethod<
    [
      _gameID: BigNumberish,
      _moveX: BigNumberish,
      _moveY: BigNumberish,
      _proof: BytesLike,
      isPreviousMoveAHit: boolean
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "CommissionAccumulated"
  ): TypedContractEvent<
    CommissionAccumulatedEvent.InputTuple,
    CommissionAccumulatedEvent.OutputTuple,
    CommissionAccumulatedEvent.OutputObject
  >;
  getEvent(
    key: "CommissionClaimed"
  ): TypedContractEvent<
    CommissionClaimedEvent.InputTuple,
    CommissionClaimedEvent.OutputTuple,
    CommissionClaimedEvent.OutputObject
  >;
  getEvent(
    key: "EtherDeposited"
  ): TypedContractEvent<
    EtherDepositedEvent.InputTuple,
    EtherDepositedEvent.OutputTuple,
    EtherDepositedEvent.OutputObject
  >;
  getEvent(
    key: "GameCreated"
  ): TypedContractEvent<
    GameCreatedEvent.InputTuple,
    GameCreatedEvent.OutputTuple,
    GameCreatedEvent.OutputObject
  >;
  getEvent(
    key: "GameFinished"
  ): TypedContractEvent<
    GameFinishedEvent.InputTuple,
    GameFinishedEvent.OutputTuple,
    GameFinishedEvent.OutputObject
  >;
  getEvent(
    key: "GameJoined"
  ): TypedContractEvent<
    GameJoinedEvent.InputTuple,
    GameJoinedEvent.OutputTuple,
    GameJoinedEvent.OutputObject
  >;
  getEvent(
    key: "MoveSubmitted"
  ): TypedContractEvent<
    MoveSubmittedEvent.InputTuple,
    MoveSubmittedEvent.OutputTuple,
    MoveSubmittedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "CommissionAccumulated(uint256,uint256)": TypedContractEvent<
      CommissionAccumulatedEvent.InputTuple,
      CommissionAccumulatedEvent.OutputTuple,
      CommissionAccumulatedEvent.OutputObject
    >;
    CommissionAccumulated: TypedContractEvent<
      CommissionAccumulatedEvent.InputTuple,
      CommissionAccumulatedEvent.OutputTuple,
      CommissionAccumulatedEvent.OutputObject
    >;

    "CommissionClaimed(uint256)": TypedContractEvent<
      CommissionClaimedEvent.InputTuple,
      CommissionClaimedEvent.OutputTuple,
      CommissionClaimedEvent.OutputObject
    >;
    CommissionClaimed: TypedContractEvent<
      CommissionClaimedEvent.InputTuple,
      CommissionClaimedEvent.OutputTuple,
      CommissionClaimedEvent.OutputObject
    >;

    "EtherDeposited(uint256,address,uint256)": TypedContractEvent<
      EtherDepositedEvent.InputTuple,
      EtherDepositedEvent.OutputTuple,
      EtherDepositedEvent.OutputObject
    >;
    EtherDeposited: TypedContractEvent<
      EtherDepositedEvent.InputTuple,
      EtherDepositedEvent.OutputTuple,
      EtherDepositedEvent.OutputObject
    >;

    "GameCreated(uint256,address,uint256)": TypedContractEvent<
      GameCreatedEvent.InputTuple,
      GameCreatedEvent.OutputTuple,
      GameCreatedEvent.OutputObject
    >;
    GameCreated: TypedContractEvent<
      GameCreatedEvent.InputTuple,
      GameCreatedEvent.OutputTuple,
      GameCreatedEvent.OutputObject
    >;

    "GameFinished(uint256,address,uint256)": TypedContractEvent<
      GameFinishedEvent.InputTuple,
      GameFinishedEvent.OutputTuple,
      GameFinishedEvent.OutputObject
    >;
    GameFinished: TypedContractEvent<
      GameFinishedEvent.InputTuple,
      GameFinishedEvent.OutputTuple,
      GameFinishedEvent.OutputObject
    >;

    "GameJoined(uint256,address)": TypedContractEvent<
      GameJoinedEvent.InputTuple,
      GameJoinedEvent.OutputTuple,
      GameJoinedEvent.OutputObject
    >;
    GameJoined: TypedContractEvent<
      GameJoinedEvent.InputTuple,
      GameJoinedEvent.OutputTuple,
      GameJoinedEvent.OutputObject
    >;

    "MoveSubmitted(uint256,address,uint256,uint256,bool)": TypedContractEvent<
      MoveSubmittedEvent.InputTuple,
      MoveSubmittedEvent.OutputTuple,
      MoveSubmittedEvent.OutputObject
    >;
    MoveSubmitted: TypedContractEvent<
      MoveSubmittedEvent.InputTuple,
      MoveSubmittedEvent.OutputTuple,
      MoveSubmittedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
