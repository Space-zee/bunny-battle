import { ReactNode } from "react";
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
  createLobbyValidationShcema,
} from "@/validation-schemas/create-lobby-validation.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { PageTitle } from "../general/page-title";

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
        "text-white bg-gn-900 cursor-pointer": !isActive,
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
    value: "0.001",
  },
  {
    value: "0.01",
  },
  {
    value: "0.1",
  },
  {
    value: "1",
    suffix: "🤟",
  },
];

const CreateLobby = () => {
  const form = useForm<CreateLobbyValidationShcema>({
    resolver: zodResolver(createLobbyValidationShcema),
  });

  const ethValue = form.watch("value");

  const handleSubmit = (values: CreateLobbyValidationShcema) => {};

  return (
    <>
      <Container className="flex flex-col gap-7">
        <PageTitle>
          <span>Create</span>
          <span className="text-teal-400">DumBattle</span>
        </PageTitle>

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
