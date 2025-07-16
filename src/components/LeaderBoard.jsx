import React from 'react';

export default function Leaderboard({ users = [] }) {
  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏆</span>
          </div>
          <p className="text-white text-lg">No users available to display.</p>
        </div>
      </div>
    );
  }

  // Top 3 users
  const top3 = users.slice(0, 3);
  const others = users.slice(3);

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getPodiumHeight = (index) => {
    switch(index) {
      case 0: return 'h-32'; // 1st place - tallest
      case 1: return 'h-24'; // 2nd place
      case 2: return 'h-20'; // 3rd place
      default: return 'h-16';
    }
  };

  const getCardGradient = (index) => {
    switch(index) {
      case 0: return 'from-yellow-400 via-yellow-500 to-yellow-600'; // Gold
      case 1: return 'from-gray-300 via-gray-400 to-gray-500'; // Silver
      case 2: return 'from-orange-400 via-orange-500 to-orange-600'; // Bronze
      default: return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 sm:px-6 py-6">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-10 sm:mb-12 pt-6 sm:pt-10">
      <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
        <h1 className="text-3xl sm:text-5xl font-bold mb-2">🏆 LEADERBOARD</h1>
      </div>
      <p className="text-white/70 text-base sm:text-lg">Top performers and rising stars</p>
    </div>

    {/* Top 3 Podium */}
    <div className="mb-10 sm:mb-12">
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-6 sm:gap-4 mb-8">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={top3[1].img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={top3[1].username}
                    className="w-16 h-16 rounded-full mx-auto object-cover border-4 border-gray-300"
                  />
                  <div className="absolute -top-2 -right-2 text-2xl">🥈</div>
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{top3[1].username}</h3>
                <p className="text-gray-300 text-sm mb-2">2nd Place</p>
                <p className="text-2xl font-bold text-white">{top3[1].points}</p>
                <p className="text-gray-300 text-sm">points</p>
              </div>
            </div>
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
          </div>
        )}

        {/* 1st Place */}
        {top3[0] && (
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-yellow-400/50 hover:border-yellow-400/80 transition-all duration-300 hover:transform hover:scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  CHAMPION
                </div>
              </div>
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={top3[0].img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={top3[0].username}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-yellow-400"
                  />
                  <div className="absolute -top-3 -right-3 text-3xl">🥇</div>
                </div>
                <h3 className="font-bold text-white text-xl mb-1">{top3[0].username}</h3>
                <p className="text-yellow-300 text-sm mb-2">1st Place</p>
                <p className="text-3xl font-bold text-white">{top3[0].points}</p>
                <p className="text-gray-300 text-sm">points</p>
              </div>
            </div>
            <div className="w-16 h-20 sm:w-24 sm:h-32 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">1</span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={top3[2].img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={top3[2].username}
                    className="w-16 h-16 rounded-full mx-auto object-cover border-4 border-orange-400"
                  />
                  <div className="absolute -top-2 -right-2 text-2xl">🥉</div>
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{top3[2].username}</h3>
                <p className="text-orange-300 text-sm mb-2">3rd Place</p>
                <p className="text-2xl font-bold text-white">{top3[2].points}</p>
                <p className="text-gray-300 text-sm">points</p>
              </div>
            </div>
            <div className="w-16 h-16 sm:w-24 sm:h-20 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Other Users */}
    {others.length > 0 && (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Other Competitors</h3>
        <div className="space-y-3">
          {others.map((user, index) => (
            <div
              key={user._id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 4}
                    </div>
                    <img
                      src={user.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/20"
                      alt={user.username}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-base sm:text-lg">{user.username}</h4>
                    <p className="text-gray-300 text-sm">Rank #{index + 4}</p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-xl sm:text-2xl font-bold text-white">{user.points}</p>
                  <p className="text-gray-300 text-sm">points</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

  );
}