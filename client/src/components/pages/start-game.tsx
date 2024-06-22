import { Board } from "../board/board";
import { Container } from "../general/container";
import { WalletBalance } from "../general/wallet-balance";

import { RoomParticipant } from "../create-room/participant";
import { RoomPrize } from "../create-room/room-prize";
import { PageTitle } from "../general/page-title";

const StartGame = () => {
  return (
    <>
      <Container className="flex flex-col items-center">
        <PageTitle>DumBattle #13</PageTitle>

        <div className="gap-4 flex w-full flex-col items-center mt-6">
          <div className="flex w-full justify-between items-center gap-5">
            <RoomParticipant isActive={true} name="@random" />
            <span className="text-[32px]">🤔</span>
            <RoomParticipant isActive={false} name="@random" />
          </div>
          <RoomPrize value="0.0019" />
        </div>
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
