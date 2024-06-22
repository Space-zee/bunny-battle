import { http, createConfig } from "wagmi";
import { scroll, scrollSepolia } from "wagmi/chains";


// @ts-ignore
export const wagmiConfig = createConfig({
  chains: [scroll, scrollSepolia],
  transports: {
    [scroll.id]: http(),
    [scrollSepolia.id]: http(),
  },
});
