import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import logo from "../assets/logo.png";
import supabase from "/supabaseClient.js";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check authentication state when component mounts
  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsLoggedIn(true);
        setUser(session.user);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", session.user.email);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
      }
    };

    checkAuthStatus();

    // ✅ Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setIsLoggedIn(true);
        setUser(session.user);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", session.user.email);
      }
      if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
      }
    });

    // ✅ Cleanup function to prevent memory leaks
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Handle Login & Logout
  const handleAuthAction = async () => {
    if (isLoggedIn) {
      await supabase.auth.signOut();
      navigate("/"); // Redirect to home after logout
    } else {
      navigate("/login"); // Redirect to login
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        
        {/* ✅ Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 items-center">
          {/* Left: Logo & Name */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="RecoAI Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-gray-900">
              Reco<span className="text-purple-800">AI</span>
            </h1>
          </div>
          
          {/* Middle: Navigation Links */}
          <ul className="flex justify-center gap-6 text-lg font-medium text-gray-900">
            <li><Link to="/" className="hover:text-purple-800 transition">Home</Link></li>
            <li><Link to="/texts" className="hover:text-purple-800 transition">Texts</Link></li>
            <li><Link to="/about" className="hover:text-purple-800 transition">About</Link></li>
          </ul>
          
          {/* Right: User Info & Auth Button */}
          <div className="flex justify-end">
            <div className="flex items-center gap-3">
              {isLoggedIn && (
                <div className="flex items-center gap-2 mr-2">
                  <UserCircle size={20} className="text-purple-800" />
                  <span className="text-sm text-gray-700">{localStorage.getItem("userEmail")}</span>
                </div>
              )}
              <button
                onClick={handleAuthAction}
                className="px-6 py-2 rounded-md bg-purple-800 text-white hover:bg-purple-900 transition shadow-md"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </div>
        
        {/* ✅ Mobile Layout */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="RecoAI Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-900">
              Reco<span className="text-purple-800">AI</span>
            </h1>
          </div>
          
          {/* Mobile Auth Button */}
          <button
            onClick={handleAuthAction}
            className="px-4 py-1.5 rounded-md bg-purple-800 text-white text-sm hover:bg-purple-900 transition shadow-md"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md py-4 space-y-4">
          <Link to="/" className="hover:text-purple-800 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/texts" className="hover:text-purple-800 transition" onClick={() => setIsMenuOpen(false)}>Texts</Link>
          <Link to="/about" className="hover:text-purple-800 transition" onClick={() => setIsMenuOpen(false)}>About</Link>
          
          {isLoggedIn && (
            <div className="flex items-center gap-2 py-2">
              <UserCircle size={20} className="text-purple-800" />
              <span className="text-sm text-gray-700">{localStorage.getItem("userEmail")}</span>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;