
import {RoomParticipant} from '../create-room/participant';
const CreateLobby = () => {
  return (
    <div >
        <h2 className="text-3xl font-bold text-center text-white">Lobby</h2>
        <div className='flex w-full h-full'>
        <RoomParticipant isActive={true} name="@random"></RoomParticipant>
        <span className="text-lg text-white">⚔</span>
        <RoomParticipant isActive={false} name="@random"></RoomParticipant>
        </div>
    </div>
   
  );
};

export { CreateLobby };
