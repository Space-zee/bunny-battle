import { AvailableRooms } from "../lobby/available-rooms";
import { BottomBlock } from "../general/bottom-block";

const LobbyActive = () => {
  return (
    <div className="flex w-full h-full flex-col justify-between">
      <div className="flex flex-col gap-7 pt-9">
        <AvailableRooms />
      </div>

      <BottomBlock />
    </div>
  );
};

export { LobbyActive };
