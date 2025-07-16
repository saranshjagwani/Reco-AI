import React from "react";

export default function TopUsers({ users }) {
  const topThree = users.slice(0, 3);
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="bg-yellow-50 p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold text-center text-yellow-700 mb-4">Top 3 Performers</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {topThree.map((user, index) => (
          <div key={user._id} className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
              <img
                src={user.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={user.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                }}
              />
            </div>
            <div className="mt-2 text-lg font-semibold">{user.username}</div>
            <div className="text-sm text-gray-600">
              {medals[index]} {user.points} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
