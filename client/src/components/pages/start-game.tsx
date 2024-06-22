import { Board } from "../board/board";
import { Container } from "../general/container";
import { WalletBalance } from "../general/wallet-balance";

const StartGame = () => {
  return (
    <>
      <Container className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center text-white flex mt-[88px]">
          DumBattle #13
        </h2>
        <div className="mt-5 flex flex-col gap-2 items-center w-full">
          <div className="w-full flex justify-between items-center px-3">
            <span className="text-gn-500 text-xl">You turn</span>
            <div className="w-[72px] flex justify-center items-center text-teal-300 font-semibold text-xl bg-gn-900 rounded-[45px] py-2">
              0:44
            </div>
          </div>
          <Board />
        </div>
      </Container>
      <WalletBalance />
    </>
  );
};

export { StartGame };
