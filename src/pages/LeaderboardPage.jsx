import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from '../components/LeaderBoard';
import ClaimPoints from '../components/ClaimPoints';

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://leaderboard-backend-r8zw.onrender.com/api/users');
      const sorted = res.data.sort((a, b) => b.points - a.points);
      setUsers(sorted);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 flex flex-col gap-8">
      
      {/* Leaderboard Section */}
      <div className="bg-gradient-to-tr from-indigo-900 to-purple-900 rounded-2xl p-6 shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
        <Leaderboard users={users} />
      </div>

      {/* Claim Points Section at bottom */}
      <div className="bg-gradient-to-tr from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center">
        <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-xl">
          <span className="text-white text-2xl font-bold">$</span>
        </div>
        <h2 className="text-2xl font-bold text-green-400 mb-1">Claim Random Points</h2>
        <p className="text-gray-300 text-sm mb-6">Reward your players with bonus points</p>
        <ClaimPoints onClaim={fetchUsers} />
      </div>
    </div>
  );
}
