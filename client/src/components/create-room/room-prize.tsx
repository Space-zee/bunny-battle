type RoomParticipantProps = { value: string };
const RoomPrize = ({ value }: RoomParticipantProps) => {
  return (
    <div className="text-center flex flex-col text-base font-semibold">
      <span className="text-gn-500">for prize of</span>
      <span className="text-tail-300">{value} ETH</span>
    </div>
  );
};

export { RoomPrize };
