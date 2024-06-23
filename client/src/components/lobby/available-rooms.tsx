import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { IGetActiveRoomsRes } from "@/interfaces/api.interface";
import { httpClient } from "@/core/httpClient";
import { apiPaths } from "@/core/httpClient/apiPaths";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { apiBaseUrl } from "@/constants/api.constant";
import TgWebApp from "@twa-dev/sdk";

const AvailableRooms = () => {
  const [rooms, setRooms] = useState<IGetActiveRoomsRes[]>([]);
  const navigate = useNavigate();
  const socket = io(apiBaseUrl); // Replace with your server URL

  useEffect(() => {
    const call = async () => {
      const res = await httpClient.get<IGetActiveRoomsRes[]>(apiPaths.getActiveRooms());
        if(res.data) {
          setRooms(res.data);
        }
    };
    call();
  }, []);

  useEffect(() => {
    // connect to socket
    socket.connect();
    socket.on("disconnect", () => {
      // fire when socked is disconnected
      console.log("Socket disconnected");
    });
    socket.on(
      `roomCreated:${TgWebApp.initDataUnsafe.user!.id}`,
      (body: any) => {
        // fire when socked is disconnected
        console.log("roomCreated", body);
        navigate(`/game/${body.roomId}`);
      }
    );

    // remove all event listeners
    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.off(`joinRoom`);
    };
  }, []);

  const onSelectRoom = (roomId: string) => {
    socket.emit('joinRoom', { roomId, telegramUserId: TgWebApp?.initDataUnsafe.user?.id });
    navigate(`/game/${roomId}?isReady=true`);
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
