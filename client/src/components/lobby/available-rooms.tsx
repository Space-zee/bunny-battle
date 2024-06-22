import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { IGetActiveRoomsRes } from "@/interfaces/api.interface";
import { httpClient } from "@/core/httpClient";
import { apiPaths } from "@/core/httpClient/apiPaths";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const AvailableRooms = () => {
  const [rooms, setRooms] = useState<IGetActiveRoomsRes[]>([]);
  const navigate = useNavigate();
  const socket = io('http://localhost:3000'); // Replace with your server URL

  useEffect(() => {
    const call = async () => {
      const res = await httpClient.get<IGetActiveRoomsRes[]>(apiPaths.getActiveRooms());
        if(res.data) {
          setRooms(res.data);
        }
    };
    call();
  }, []);

  const onSelectRoom = (roomId: string) => {
    socket.emit('joinRoom', { roomId, telegramUserId: 1 });
    navigate(`/lobby/${roomId}?isReady=true`);
  }

  return (
    <div className="flex flex-col gap-2 pb-[20px]">
      {rooms.map((item) => (
        <div
          key={item.roomId}
          className="flex items-center justify-between bg-gn-900 rounded-xl p-2"
        >
          <span className="font-medium text-base text-white">@{item.username}</span>
          <div className="flex items-center gap-3">
            <span className="text-base text-white">⚔ {item.bet}</span>
            <Button className="bg-white text-black" onClick={() => onSelectRoom(item.roomId)}>Fight</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { AvailableRooms };
