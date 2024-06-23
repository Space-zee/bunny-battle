import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Container } from "../general/container";
import { WalletBalance } from "../general/wallet-balance";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { PageTitle } from "../general/page-title";
import { RefreshIcon } from "@/assets/refresh.icon";
import { httpClient } from "@/core/httpClient";
import { IGetActiveRoomsRes } from "@/interfaces/api.interface";
import { apiPaths } from "@/core/httpClient/apiPaths";
import { useAtom } from "jotai";
import { $doGlobalState } from "@/core/models/global";

interface Tab {
  name: string;
  path: string;
}

const tabs: Tab[] = [
  { name: "Active", path: "/lobby/active" },
  { name: "Ended", path: "/lobby/ended" },
];

const Tabs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isTabActive = (tab: Tab) => {
    return pathname === tab.path;
  };

  return (
    <div className="flex items-center justify-between w-full p-1 gap-1 bg-gn-900 rounded-[24px]">
      {tabs.map((tab) => (
        <div
          className={cn(
            "text-base font-bold flex items-center justify-center py-[7px] rounded-[32px] flex-1",
            {
              "bg-fuchisia-300 text-black": isTabActive(tab),
              "text-gn-400": !isTabActive(tab),
            }
          )}
          onClick={() => navigate(tab.path)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

const Lobby = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [globalState, setGlobalState] = useAtom($doGlobalState);

  const getRooms = async () => {
    const res = await httpClient.get<IGetActiveRoomsRes[]>(
      apiPaths.getActiveRooms()
    );
    if (res.data) {
      setGlobalState({ ...globalState, activeRooms: res.data });
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (pathname === "/lobby") {
      navigate("/lobby/active");
    }
  }, [navigate, pathname]);

  return (
    <div className="flex w-full h-full flex-col justify-between">
      <Container>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-6 pt-9">
            <div className="flex w-full cursor-pointer items-center">
              <PageTitle onClick={getRooms} className="cursor-pointer">
                <span>Combat lobby</span>
                <RefreshIcon />
              </PageTitle>
            </div>
            <Tabs />
          </div>
          <Outlet />
        </div>
      </Container>
      <WalletBalance />
    </div>
  );
};

export { Lobby };
