type RoomParticipantProps = { number: string }
const RoomPrize = ({number}: RoomParticipantProps) => {
  return (
    <div className='text-center flex flex-col mt-3 text-base font-semibold'>
        <span className='text-gn-500'>for prize of</span>
        <span className='text-tail-300'>{number} ETH</span>
    </div>
  );
};

export { RoomPrize };
