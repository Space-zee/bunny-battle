import TgWebApp from "@twa-dev/sdk";
import { TgButtons } from "@/lib/telegram";
import { useEffect } from "react";

import { Container } from "./container";

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
    <path
      stroke="#15B79E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M7 1.335c-.45.006-.72.032-.938.144-.251.127-.455.331-.583.582-.111.219-.138.489-.144.939M13 1.335c.45.006.72.032.939.144.25.127.455.331.582.582.112.219.138.489.144.939m0 6c-.006.45-.032.72-.143.939-.128.25-.332.454-.583.582-.219.112-.489.138-.939.144m1.667-5.332v1.334M9.334 1.333h1.333m-7.2 13.334h5.066c.747 0 1.12 0 1.406-.146.25-.128.455-.332.582-.582.146-.286.146-.659.146-1.406V7.467c0-.747 0-1.12-.146-1.406a1.333 1.333 0 0 0-.582-.582c-.285-.146-.659-.146-1.405-.146H3.466c-.747 0-1.12 0-1.405.146-.251.127-.455.331-.583.582-.146.286-.146.659-.146 1.406v5.066c0 .747 0 1.12.146 1.406.128.25.332.454.583.582.285.146.658.146 1.405.146Z"
    />
  </svg>
);

const shortcutWallet = (wallet: string) => {
  return (
    wallet.slice(0, 4) + "..." + wallet.slice(wallet.length - 5, wallet.length)
  );
};

const BottomBlock = () => {
  const wallet = "0xa2dD817c2fDc3a2996f1A5174CF8f1AaED466E82";

  const handleShowMainButton = () => {};

  useEffect(() => {
    if (!TgWebApp) {
      return;
    }

    const tgButtons = new TgButtons(TgWebApp);

    tgButtons.showMainButton(handleShowMainButton, {});
  }, []);

  return (
    <div className="fixed w-full bottom-[100px] left-0">
      <Container>
        <div className="w-full flex items-center justify-between border-4 border-teal-400 rounded-[24px] border-spacing-1 px-3 py-2">
          <CopyIcon />
          <div className="flex items-center gap-1">
            <span className="text-wite font-semibold">
              {shortcutWallet(wallet)} ⋅
            </span>
            <span className="font-semibold text-gn-500">My balance</span>
            <span className="text-white font-semibold">0.000 ETH</span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { BottomBlock };
