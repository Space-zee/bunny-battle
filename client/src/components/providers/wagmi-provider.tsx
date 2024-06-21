import { ReactNode } from "react";
import { WagmiProvider as Wagmi } from "wagmi";

import { wagmiConfig } from "@/configs/wagmi.config";

interface WagmiProviderProps {
  children: ReactNode;
}

const WagmiProvider = ({ children }: WagmiProviderProps) => {
  return <Wagmi config={wagmiConfig}>{children}</Wagmi>;
};

export { WagmiProvider };
