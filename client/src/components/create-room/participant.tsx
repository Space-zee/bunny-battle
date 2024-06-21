type RoomParticipantProps = { isActive: boolean, name: string }
const RoomParticipant = ({isActive, name}: RoomParticipantProps) => {
  return (
    <div className="bg-gn-900 rounded-xl p-2 w-[135px] text-ellipsis overflow-hidden">
        <span className={isActive ? 'text-tail-300' : 'text-gn-500'}>{name}</span>
    </div>
  );
};

export { RoomParticipant };
