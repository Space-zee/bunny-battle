import { IGetActiveRoomsRes } from "@/interfaces/api.interface";

export interface GlobalState {
  wallet: string | null;
  activeRooms: IGetActiveRoomsRes[];
  endedRooms: any;
}
