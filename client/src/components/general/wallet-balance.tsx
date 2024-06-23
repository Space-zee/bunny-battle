import { useEffect, useMemo } from "react";

import { Container } from "./container";
import { useBalance } from "wagmi";
import { formatAddress, formatEthBalance } from "@/utils/strings";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai/index";
import * as coreModels from "@/core/models";
import { useGetUserWallet } from "@/fetch/useGetUserWallet";
import { Address } from "viem";
import { $doGlobalState } from "@/core/models/global";

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={16} fill="none">
    <path
      stroke="#D444F1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M6.5 1.335c-.45.006-.72.032-.938.144-.251.127-.455.331-.583.582-.111.219-.138.489-.144.939M12.5 1.335c.45.006.72.032.939.144.25.127.455.331.582.582.112.219.138.489.144.939m0 6c-.006.45-.032.72-.143.939-.128.25-.332.454-.583.582-.219.112-.489.138-.939.144m1.667-5.332v1.334M8.834 1.333h1.333m-7.2 13.334h5.066c.747 0 1.12 0 1.406-.146.25-.128.455-.332.582-.582.146-.286.146-.659.146-1.406V7.467c0-.747 0-1.12-.146-1.406a1.333 1.333 0 0 0-.582-.582c-.285-.146-.659-.146-1.405-.146H2.966c-.747 0-1.12 0-1.405.146-.251.127-.455.331-.583.582-.146.286-.146.659-.146 1.406v5.066c0 .747 0 1.12.146 1.406.128.25.332.454.583.582.285.146.658.146 1.405.146Z"
    />
  </svg>
);

const WalletBalance = () => {
  const [_, copy] = useCopyToClipboard();

  const navigate = useNavigate();
  const [globalState, setGlobalState] = useAtom($doGlobalState);
  const [WebApp] = useAtom(coreModels.$webApp);
  const [TgButtons] = useAtom(coreModels.$tgButtons);
  const $doLoadWebApp = useSetAtom(coreModels.$doLoadWebApp);

  const { data: walletAddress, isLoading: isUserWalletLoading } =
    useGetUserWallet(WebApp?.initDataUnsafe.user?.id?.toString() ?? "");

  const { data: walletBalance, isLoading: isWalletBalanceLoading } = useBalance(
    {
      address: (walletAddress?.data ?? "") as Address,
      query: {
        enabled: !!walletAddress?.data,
      },
    }
  );

  const formattedAmount = useMemo(() => {
    if (walletBalance === undefined) {
      return null;
    }

    return formatEthBalance(walletBalance.formatted);
  }, [walletBalance]);

  const isWalletEmpty = useMemo(() => {
    if (isWalletBalanceLoading || isUserWalletLoading) {
      return false;
    }

    if (formattedAmount === "0") {
      return true;
    }

    return false;
  }, [formattedAmount, isUserWalletLoading, isWalletBalanceLoading]);

  const handleCopyAddress = async () => {
    if (!walletAddress?.data) {
      return;
    }

    try {
      await copy(walletAddress.data);
      toast("Address was copied");
    } catch (err) {
      console.log("Can not copy wallet to clipboard");
    }
  };

  const handleShowMainButton = () => {
    navigate("/create-lobby");
  };

  useEffect(() => {
    if (globalState.wallet || !walletAddress?.data) {
      return;
    }

    setGlobalState({ ...globalState, wallet: walletAddress.data });
  }, [globalState, setGlobalState, walletAddress?.data]);

  useEffect(() => {
    $doLoadWebApp();
    if (TgButtons) {
      TgButtons.hideBackButton();
      TgButtons.showMainButton(handleShowMainButton, {
        color: "#E478FA",
        text: "Create DumBattle",
        text_color: "#000000",
        is_active: true,
        is_visible: true,
      });
    }
  }, [WebApp]);

  if (walletAddress?.data === undefined || walletBalance === undefined) {
    return;
  }

  return (
    <div
      className="fixed w-full bottom-[20px] left-0"
      onClick={() => handleCopyAddress()}
    >
      <Container>
        <div
          className={cn(
            "w-full flex items-center justify-between rounded-[24px] border-spacing-1 px-4 py-2 bg-gn-950",
            {
              "border-4 border-fuchisia-400": isWalletEmpty,
              "border-2 border-gn-800": !isWalletEmpty,
            }
          )}
        >
          <CopyIcon />
          <div className="flex items-center justify-center gap-2 w-full">
            <span className="text-wite font-semibold">
              {formatAddress(walletAddress.data ?? "")}
            </span>
            <span>⋅</span>
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
