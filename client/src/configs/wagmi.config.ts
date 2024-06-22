import { http, createConfig } from "wagmi";
import { scroll, scrollSepolia } from "wagmi/chains";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const wagmiConfig = createConfig({
  chains: [scroll, scrollSepolia],
  transports: {
    [scroll.id]: http(),
    [scrollSepolia.id]: http(),
  },
});
