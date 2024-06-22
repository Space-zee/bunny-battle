export interface ICreateLobbyReq {
  telegramUserId: number;
  bet: string;
}

export interface ICreateLobbyRes {
  roomId: string;
  bet: string;
}

export interface IJoinRoomReq {
  roomId: string;
  telegramUserId: number;
}

export interface IJoinRoomRes {
  bet: string;
  roomId: string;
  opponentName: string;
}

export interface IRabbitsSetReq {
  rabbits: ICoordinates[];
  telegramUserId: number;
  roomId: string;
}

export interface ICoordinates {
  x: number;
  y: string;
}
