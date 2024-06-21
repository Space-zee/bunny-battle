import TgWebApp from "@twa-dev/sdk";
import { TgButtons } from "@/lib/telegram";
import { useEffect, useMemo } from "react";

import { Container } from "./container";
import { useBalance } from "wagmi";
import { formatAddress, formatEthBalance } from "@/utils/strings";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

const WalletBalance = () => {
  const wallet = "0x5d54b69b9848415d8b7abd5cb19031ec472ea1c4";

  const { data: walletBalance, isLoading: isWalletBalanceLoading } = useBalance(
    {
      address: wallet,
    }
  );

  const formattedAmount = useMemo(() => {
    if (!walletBalance) {
      return null;
    }

    return formatEthBalance(walletBalance.formatted);
  }, [walletBalance]);

  const isWalletEmpty = useMemo(() => {
    if (isWalletBalanceLoading) {
      return false;
    }

    if (formattedAmount === null) {
      return true;
    }

    return false;
  }, [formattedAmount, isWalletBalanceLoading]);

  const handleCopyAddress = () => {
    toast("Address was copied");
  };

  const handleShowMainButton = () => {};

  useEffect(() => {
    if (!TgWebApp) {
      return;
    }

    const tgButtons = new TgButtons(TgWebApp);

    tgButtons.showMainButton(handleShowMainButton, {});
  }, []);

  return (
    <div
      className="fixed w-full bottom-[100px] left-0"
      onClick={() => handleCopyAddress()}
    >
      <Container>
        <div
          className={cn(
            "w-full flex items-center justify-between rounded-[24px] border-spacing-1 px-3 py-2 bg-gn-950",
            {
              "border-4 border-teal-400": isWalletEmpty,
              "border-2 border-gn-800": !isWalletEmpty,
            }
          )}
        >
          <CopyIcon />
          <div className="flex items-center gap-1">
            <span className="text-wite font-semibold">
              {formatAddress(wallet)} ⋅
            </span>
            <span className="font-semibold text-gn-500">My balance</span>
            <span className="text-white font-semibold">
              {formattedAmount} ETH
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { WalletBalance };
