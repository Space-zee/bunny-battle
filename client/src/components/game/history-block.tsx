import { ScrollIcon } from "@/assets/scroll.icon";
import { cn } from "@/lib/utils";
import { coordinatesToIndex } from "@/utils/math";
import { useAtomValue, useSetAtom } from "jotai";
import { ReactNode, useEffect, useMemo } from "react";
import * as coreModels from "../../core/models";
import { Link } from "react-router-dom";

interface TextProps {
  children: ReactNode;
  isSystemMessage?: boolean;
}

const Text = ({ children, isSystemMessage }: TextProps) => (
  <span
    className={cn("font-semibold text-xs", {
      "texy-white": !isSystemMessage,
      "text-gn-500": isSystemMessage,
    })}
  >
    {children}
  </span>
);

interface HistoryBlockItemProps {
  x: number;
  y: number;
  isHit: boolean;
  user: string;
  winner?: string;
  tx: string;
}

const scrollscanTransactionLink = "https://sepolia.scrollscan.com/tx/";

const HistoryBlockItem = ({
  x,
  y,
  isHit,
  winner,
  tx,
}: HistoryBlockItemProps) => {
  const WebApp = useAtomValue(coreModels.$webApp);
  const $doLoadWebApp = useSetAtom(coreModels.$doLoadWebApp);

  useEffect(() => {
    $doLoadWebApp();
  }, [$doLoadWebApp, WebApp]);

  const isCurrentUserWinner = useMemo(() => {
    // const username = WebApp?.initDataUnsafe.chat?.username;
    const username = "user123";

    if (!username) {
      return null;
    }

    if (username === winner) {
      return true;
    }

    return false;
  }, [WebApp?.initDataUnsafe.chat?.username, winner]);

  return (
    <div className="w-full flex items-center justify-between leading-normal">
      {!winner ? (
        <div className="flex items-center gap-1">
          <Text>{isHit ? "❌🐇" : "⭕"}</Text>
          <Text>
            {isCurrentUserWinner
              ? "You"
              : WebApp?.initDataUnsafe.chat?.username}
          </Text>
          <Text isSystemMessage>
            fired in {coordinatesToIndex({ x, y }) + 1}
          </Text>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Text>You</Text>
          <Text isSystemMessage>Confirmed</Text>
          <Text>Lose</Text>
        </div>
      )}
      <Link
        className="flex items-center gap-1 text-xs"
        target="_blank"
        to={`${scrollscanTransactionLink}${tx}`}
      >
        <span className="text-fuchsia-500 font-semibold">go to txn</span>
        <ScrollIcon />
      </Link>
    </div>
  );
};

interface HistoryBlockProps {
  items: HistoryBlockItemProps[];
}

const HistoryBlock = ({ items }: HistoryBlockProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      {items.map((item, index) => (
        <HistoryBlockItem {...item} key={index} />
      ))}
    </div>
  );
};

export { HistoryBlockItem, HistoryBlock };
