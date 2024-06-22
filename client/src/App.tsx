import { ThemeProvider } from "./components/providers/theme-provider";
import { WagmiProvider } from "./components/providers/wagmi-provider";
import { ReactQueryProvider } from "./components/providers/react-query-provider";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "./globals.css";
import { Lobby } from "./components/pages/lobby";
import { LobbyActive } from "./components/pages/lobby-active";
import { LobbyEnded } from "./components/pages/lobby-ended";
import { Toaster } from "./components/ui/sonner";
import { CreateLobby } from "./components/pages/create-lobby";
import { StartGame } from "./components/pages/start-game";
import { LobbyCreated } from "@/components/pages/lobbyCreated.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/lobby" replace />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
    children: [
      {
        path: "active",
        element: <LobbyActive />,
      },
      {
        path: "ended",
        element: <LobbyEnded />,
      },
      {
        path: ":id",
        element: <LobbyCreated />,
      },
    ],
  },
  {
    path: "/create-lobby",
    element: <CreateLobby />,
  },
  {
    path: "/start-game",
    element: <StartGame />,
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WagmiProvider>
        <ReactQueryProvider>
          <Toaster />
          <RouterProvider router={router} />
        </ReactQueryProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default App;
