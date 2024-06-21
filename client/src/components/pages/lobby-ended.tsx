import { EndedRooms } from "../lobby/ended-rooms";
import { BottomBlock } from "../general/bottom-block";

const LobbyEnded = () => {
  return <div className="flex w-full h-full flex-col justify-between">
  <div className="flex flex-col gap-7 pt-9">
    <EndedRooms />
   </div>

  <BottomBlock />
</div>
};

export { LobbyEnded };
