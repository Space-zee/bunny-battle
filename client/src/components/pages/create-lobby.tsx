
import {RoomParticipant} from '../create-room/participant';
import {RoomPrize} from '../create-room/room-prize'
const CreateLobby = () => {
  return (
    <div >
        <h2 className="text-3xl font-bold text-center text-white pt-8 gap-4">DumBattle</h2>
        <div className='flex w-full h-full justify-between px-2 mt-6'>
            <RoomParticipant isActive={true} name='@random'></RoomParticipant>
            <span className='text-4xl text-whit'>⚔</span>
            <RoomParticipant isActive={false} name='@random'></RoomParticipant>
        </div>
        <RoomPrize number='0.0019'></RoomPrize>
    </div>
   
  );
};

export { CreateLobby };
