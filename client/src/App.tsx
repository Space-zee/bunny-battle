import { ThemeProvider } from "./components/providers/theme-provide";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "./globals.css";
import { Lobby } from "./components/pages/lobby";
import { LobbyActive } from "./components/pages/lobby-active";
import { LobbyEnded } from "./components/pages/lobby-ended";

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
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
