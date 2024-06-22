export interface ICreateGameReq {
  telegramUserId: number;
  roomId: string;
  coordinates: any;
}

export interface ICreateRoomReq {
  telegramUserId: number;
}

export interface IGetActiveRoomsRes {
  username: string;
  bet: string;
  roomId: string;
}
