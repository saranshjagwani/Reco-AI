import React, { useEffect, useState } from 'react';

export default function ClaimPoints({ onClaim }) {
  // State management for users, selection, and UI feedback
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);

  /**
   * Fetches all users from the API on component mount
   * Handles loading states and error management
   */
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://leaderboard-backend-r8zw.onrender.com/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users. Please try again.');
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /**
   * Handles the claim points action
   * Processes the API call and updates UI state accordingly
   */
  const handleClaim = async () => {
    // Validate selection
    if (!selectedId) {
      setError('Please select a user first');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsClaiming(true);
    setError('');

    try {
      // Make API request to claim points
      const response = await fetch('https://leaderboard-backend-r8zw.onrender.com/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedId })
      });

      if (!response.ok) {
        throw new Error('Failed to claim points');
      }

      const data = await response.json();
      const points = data.points;
      
      // Update UI with success state
      setClaimedPoints(points);
      const user = users.find(u => u._id === selectedId);
      setSelectedUser(user);

      // Call parent callback if provided
      if (onClaim) onClaim();

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setClaimedPoints(null);
        setSelectedUser(null);
        setSelectedId(''); // Reset selection
      }, 3000);

    } catch (err) {
      setError('Error claiming points. Please try again.');
      console.error('Error claiming points:', err);
      
      // Auto-clear error after 4 seconds
      setTimeout(() => setError(''), 4000);
    } finally {
      setIsClaiming(false);
    }
  };

  /**
   * Handles user selection change
   * @param {Event} e - Select change event
   */
  const handleUserSelect = (e) => {
    setSelectedId(e.target.value);
    setError(''); // Clear any previous errors
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4 sm:p-6">
    {/* Background blur bubbles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-20 right-10 sm:right-32 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 sm:left-32 w-48 sm:w-64 h-48 sm:h-64 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-teal-500/3 rounded-full blur-3xl"></div>
    </div>

    {/* Main card */}
    <div className="relative z-10 w-full max-w-md sm:max-w-lg">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-4 shadow-lg">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Claim Random Points
          </h2>
          <p className="text-gray-400 text-sm font-medium">Reward your players with bonus points</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Dropdown */}
        <div className="mb-5">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Select Player
          </label>
          <div className="relative">
            <select
              value={selectedId}
              onChange={handleUserSelect}
              disabled={isLoading || isClaiming}
              className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl p-3 sm:p-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 disabled:opacity-50"
            >
              <option value="">{isLoading ? 'Loading players...' : 'Choose a player'}</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleClaim}
          disabled={!selectedId || isLoading || isClaiming}
          className={`w-full py-3 sm:py-4 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
            !selectedId || isLoading || isClaiming
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95'
          }`}
        >
          {isClaiming ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Claim Random Points
            </div>
          )}
        </button>

        {/* Success */}
        {claimedPoints && selectedUser && (
          <div className="mt-6 p-4 sm:p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-white">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-900/80 flex items-center justify-center">
                  <img
                    src={selectedUser.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={selectedUser.username}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }}
                  />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start text-emerald-300 mb-1">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Points Claimed Successfully!
                </div>
                <p>
                  <span className="font-semibold">{selectedUser.username}</span> earned{' '}
                  <span className="font-bold text-emerald-400 text-lg">{claimedPoints}</span> points!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Text */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Points are randomly generated between 1–10
        </p>
      </div>
    </div>
  </div>
);
}