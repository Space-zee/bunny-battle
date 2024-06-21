const EndedRooms = () => {
  const items = [
    { gameId: "1", looser: "@kolom", winner: "@DeinerisTArgarian", loserValue: "0.001", winnerValue: "0.002"  },
    { gameId: "2", looser: "@kolom", winner: "@DeinerisTArgarian", loserValue: "0.001", winnerValue: "0.002"  },
    // { gameId: "3", looser: "@kolom", winner: "@khrystyna", loserValue: "0.001", winnerValue: "0.002"  },

  ];

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.gameId}
          className="bg-gn-900 rounded-xl p-2"
        >
            <div className="flex justify-between items-center gap-3">
                <span className="font-medium text-base text-white">{item.looser}</span>
                <span className="text-base text-red-600">-{item.loserValue}</span>

            </div>
            <span className="text-lg text-white">⚔ {item.gameId}</span>
            <div className="flex justify-between items-center gap-3">
                <span className="font-medium text-base text-white">🏆 {item.winner}</span>
                <span className="text-base text-green-600">+{item.winnerValue}</span>

            </div>
        </div>
      ))}
    </div>
  );
};

export { EndedRooms };
