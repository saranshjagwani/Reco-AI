import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Items/Navbar';
import VoiceRecorder from './Blocks/Recorder';
import TranscriptList from './pages/TranscriptList';
import TranscriptDetail from "./pages/TranscriptDetail";
import AudioUploader from "./Blocks/AudioUploader";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import ProtectedResetPasswordFlow from "./auth/ResetPassword";
import ProtectedRoute from "./auth/ProtectedRoutes";
import AboutUs from "./pages/AboutUs";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ProtectedResetPasswordFlow />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<VoiceRecorder />} />
          <Route path="/texts" element={<TranscriptList />} />
          <Route path="texts/:id" element={<TranscriptDetail />} />
          <Route path="/upload" element={<AudioUploader />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
