import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // ✅ Only these are needed
import axios from 'axios';

import LeaderboardPage from './pages/LeaderBoardPage';
import AddUserPage from './pages/AddUserPage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';

export default function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      const sorted = res.data.sort((a, b) => b.points - a.points);
      setUsers(sorted);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
 <Navbar/>
      <main className="p-4">
        
        <Routes>
          <Route path="/" element={<LeaderboardPage />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
     
    </div>
  );
}
