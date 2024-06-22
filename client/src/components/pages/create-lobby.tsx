import { ReactNode, useEffect } from "react";
import { Container } from "../general/container";
import { WalletBalance } from "../general/wallet-balance";
import { Input } from "../ui/input";
import { EtherIcon } from "@/assets/ether.icon";
import { cn } from "@/lib/utils";
import { InfoIcon } from "@/assets/inco.icon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateLobbyValidationShcema,
  createLobbyValidationShcema
} from "@/validation-schemas/create-lobby-validation.schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { io } from "socket.io-client";
import TgWebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import * as coreModels from '../../core/models'

interface LabelProps {
  children: ReactNode;
}

const Label = ({ children }: LabelProps) => (
  <span className="text-gn-500 font-medium text-base">{children}</span>
);

interface ValueBlockProps {
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const ValueBlock = ({ children, isActive, onClick }: ValueBlockProps) => (
  <div
    onClick={onClick}
    className={cn(
      "flex flex-1 py-[10px] max-w-28 items-center rounded-lg justify-center gap-[2px]",
      {
        "text-black bg-white": isActive,
        "text-white bg-gn-900 cursor-pointer": !isActive
      }
    )}
  >
    <EtherIcon />
    {children}
  </div>
);

interface BetValue {
  value: string;
  suffix?: string;
}

const bets: BetValue[] = [
  {
    value: "0.001"
  },
  {
    value: "0.01"
  },
  {
    value: "0.1"
  },
  {
    value: "1",
    suffix: "🤟"
  }
];

const CreateLobby = () => {
  const form = useForm<CreateLobbyValidationShcema>({
    resolver: zodResolver(createLobbyValidationShcema)
  });

  const ethValue = form.watch("value");
  const [WebApp] = useAtom(coreModels.$webApp);
  const [TgButtons] = useAtom(coreModels.$tgButtons);
  const $doLoadWebApp = useSetAtom(coreModels.$doLoadWebApp);
  const socket = io("http://localhost:3000", { autoConnect: false });
  const navigate = useNavigate();

  const onBack = () => {
    TgButtons?.hideMainButton();
    navigate("/");
  };

  useEffect(() => {
    $doLoadWebApp();
    if(TgButtons){
      TgButtons.showMainButton(createLobby, {
        color: "#2ED3B7",
        text: "Confirm",
        text_color: "#000000",
        is_active: !!ethValue,
        is_visible: true
      });
    }
  }, [WebApp]);

  useEffect(() => {// connect to socket
    socket.connect();
    socket.on("disconnect", () => { // fire when socked is disconnected
      console.log("Socket disconnected");
    });
    socket.on(`roomCreated:${TgWebApp.initDataUnsafe.user!.id}`, (body: any) => { // fire when socked is disconnected
      console.log("roomCreated", body);
      navigate(`/lobby/${body.roomId}`);
    });

    // remove all event listeners
    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.off(`roomCreated:${TgWebApp.initDataUnsafe.user!.id}`);
    };
  }, []);

  const createLobby = () => {
    socket.connect();
    socket.emit("createLobby", { bet: ethValue, telegramUserId: TgWebApp.initDataUnsafe.user!.id });
  };

  useEffect(() => {

    TgButtons?.showBackButton(onBack)
    TgButtons?.showMainButton(createLobby, {
      color: "#2ED3B7",
      text: "Confirm",
      text_color: "#000000",
      is_active: !!ethValue,
      is_visible: true
    });
  }, [ethValue]);



  const handleSubmit = () => {
  };

  return (
    <>
      <Container className="flex flex-col gap-7">
        <div className="flex items-center justify-center gap-1 mt-[88px] w-full">
          <h2 className="text-3xl font-bold text-center text-white flex">
            Create
          </h2>
          <h2 className="text-3xl font-bold text-center flex text-teal-400">
            DumBattle
          </h2>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col w-full gap-2">
              <Label>Set custom bet amount</Label>
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Min amount is 0.001 ETH"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <button onClick={createLobby}>
                Create
              </button>
              <Label>Or use presset</Label>
              <div className="flex gap-1 w-full">
                {bets.map((bet) => (
                  <ValueBlock
                    isActive={ethValue === Number(bet.value)}
                    onClick={() => {
                      form.clearErrors("value");
                      form.setValue("value", Number(bet.value));
                    }}
                  >
                    {bet.value}
                    {bet?.suffix}
                  </ValueBlock>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full rounded-lg bg-gn-800 p-3">
              <div className="flex items-center gap-1">
                <InfoIcon />
                <p className="text-white text-sm font-medium leading-normal">
                  Battle reward logic
                </p>
              </div>
              <p className="text-gn-500 text-sm">
                If you win the battle, you will receive a reward equal to 99% of
                your bet, where 1% is a fee
              </p>
            </div>
          </form>
        </Form>
      </Container>
      <WalletBalance />
    </>
  );
};

export { CreateLobby };

// r 8px gn800 p12     text: gn500 fz14 font bold
