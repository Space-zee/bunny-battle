/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  FunctionFragment,
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
} from "../../common";

export interface IBunnyBattleInterface extends Interface {
  getEvent(
    nameOrSignatureOrTopic:
      | "CommissionAccumulated"
      | "CommissionClaimed"
      | "EtherDeposited"
      | "GameCreated"
      | "GameFinished"
      | "GameJoint"
      | "MoveSubmited"
  ): EventFragment;
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

export namespace GameJointEvent {
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

export namespace MoveSubmitedEvent {
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

export interface IBunnyBattle extends BaseContract {
  connect(runner?: ContractRunner | null): IBunnyBattle;
  waitForDeployment(): Promise<this>;

  interface: IBunnyBattleInterface;

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

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

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
    key: "GameJoint"
  ): TypedContractEvent<
    GameJointEvent.InputTuple,
    GameJointEvent.OutputTuple,
    GameJointEvent.OutputObject
  >;
  getEvent(
    key: "MoveSubmited"
  ): TypedContractEvent<
    MoveSubmitedEvent.InputTuple,
    MoveSubmitedEvent.OutputTuple,
    MoveSubmitedEvent.OutputObject
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

    "GameJoint(uint256,address)": TypedContractEvent<
      GameJointEvent.InputTuple,
      GameJointEvent.OutputTuple,
      GameJointEvent.OutputObject
    >;
    GameJoint: TypedContractEvent<
      GameJointEvent.InputTuple,
      GameJointEvent.OutputTuple,
      GameJointEvent.OutputObject
    >;

    "MoveSubmited(uint256,address,uint256,uint256,bool)": TypedContractEvent<
      MoveSubmitedEvent.InputTuple,
      MoveSubmitedEvent.OutputTuple,
      MoveSubmitedEvent.OutputObject
    >;
    MoveSubmited: TypedContractEvent<
      MoveSubmitedEvent.InputTuple,
      MoveSubmitedEvent.OutputTuple,
      MoveSubmitedEvent.OutputObject
    >;
  };
}