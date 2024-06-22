import { cn } from "@/lib/utils";

type RoomParticipantProps = { isActive: boolean; name: string };
const RoomParticipant = ({ isActive, name }: RoomParticipantProps) => {
  return (
    <div
      className={cn(
        "bg-gn-900 rounded-xl p-2 flex-1 truncate flex justify-between items-center",
        {
          "border-2 border-fuchisia-300": isActive,
        }
      )}
    >
      <span
        className={cn("text-fuchisia-300 text-base font-semibold truncate", {
          "text-fuchisia-300": isActive,
          "text-gn-500": !isActive,
        })}
      >
        {name}
      </span>
      <span className="text-xs">🐇🐇</span>
    </div>
  );
};

export { RoomParticipant };
