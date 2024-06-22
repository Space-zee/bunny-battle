type RoomParticipantProps = { value: string };
const RoomPrize = ({ value }: RoomParticipantProps) => {
  return (
    <div className="text-center flex flex-col text-base font-semibold">
      <span className="text-gn-600">for prize of</span>
      <span className="text-tail-300 text-2xl">{value} ETH</span>
    </div>
  );
};

export { RoomPrize };
