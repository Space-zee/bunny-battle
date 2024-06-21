import { Button } from "../ui/button";

const AvailableRooms = () => {
  const items = [
    { name: "@kolom", value: "0.001" },
    { name: "@kolom", value: "0.001" },
    { name: "@kolom", value: "0.001" },
    { name: "@kolom", value: "0.001" },
    // { name: "@kolom", value: "0.001" },
    // { name: "@kolom", value: "0.001" },
    // { name: "@kolom", value: "0.001" },
    // { name: "@kolom", value: "0.001" },
    // { name: "@kolom", value: "0.001" },
    // { name: "@kolom", value: "0.001" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between bg-gn-900 rounded-xl p-2"
        >
          <span className="font-medium text-base text-white">{item.name}</span>
          <div className="flex items-center gap-3">
            <span className="text-base text-white">⚔ {item.value}</span>
            <Button className="bg-white text-black">Fight</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { AvailableRooms };
