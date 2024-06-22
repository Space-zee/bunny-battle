import { Outlet, useLocation, useSearchParams } from "react-router-dom";

import { Container } from "../general/container";
import { WalletBalance } from "../general/wallet-balance";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";


const LobbyCreated = () => {
  const { pathname } = useLocation();
  const [, , roomId, isReadyLocal] = pathname.split("/");
  const [searchParams] = useSearchParams();
  const [isReady, setIsReady] = useState(Boolean(searchParams.get('isReady')));
  const socket = io("http://localhost:3000", { autoConnect: false });
  useEffect(() => {// connect to socket
    socket.connect();
    socket.on("disconnect", () => { // fire when socked is disconnected
      console.log("Socket disconnected");
    });
    socket.on(`readyForBattle:${roomId}`, (body: any) => { // fire when socked is disconnected
      setIsReady(true)
    });

    // remove all event listeners
    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.off(`readyForBattle:${roomId}`);
    };
  }, []);

  return (
    <div className="flex w-full h-full flex-col justify-between">
      <Container>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-6 pt-9">
            <h2 className="text-3xl font-bold text-center text-white">Lobby CR</h2>
            {isReady ? 'Ready': 'Not REady'}
          </div>
          <Outlet />
        </div>
      </Container>
      <WalletBalance />
    </div>
  );
};

export { LobbyCreated };
