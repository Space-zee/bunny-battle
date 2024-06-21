type RoomParticipantProps = { isActive: boolean, name: string }
const RoomParticipant = ({isActive, name}: RoomParticipantProps) => {
  return (
    <div className="gap-3 bg-white">

    
    <span className={isActive ? 'text-green-100' : 'text-grey-100'}>{name}</span>
    </div>
  );
};

export { RoomParticipant };
