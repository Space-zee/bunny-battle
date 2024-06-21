export interface ICreateGameReq {
  telegramUserId: number;
  roomId: string;
  coordinates: any;
}

export interface ICreateRoomReq {
  telegramUserId: number;
}
