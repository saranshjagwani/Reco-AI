import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('https://leaderboard-backend-r8zw.onrender.com/api/claim/history')
      .then(res => setHistory(res.data))
      .catch(() => alert('Failed to fetch history'));
  }, []);

  return (
<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
          Claim History
        </h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          {history.length === 0 ? (
            <p className="text-center text-gray-300">No claim history found.</p>
          ) : (
            history.map((entry, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 flex justify-between items-center hover:bg-white/10 transition-all"
              >
                <div className="text-white">
                  <p className="font-semibold text-lg">{entry.userId?.username}</p>
                  <p className="text-sm text-gray-400">
                    Earned <span className="text-yellow-400 font-bold">{entry.points}</span> points
                  </p>
                </div>
                <div className="text-right text-sm text-gray-400">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
