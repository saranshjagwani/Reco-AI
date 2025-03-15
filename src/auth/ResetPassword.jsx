import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import supabase from "/supabaseClient.js";

// Protected route wrapper component
const ProtectedResetRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkResetToken = async () => {
      setIsLoading(true);
      
      // Check if we have a hash with access_token in the URL
      const hash = location.hash;
      
      if (!hash || !hash.includes("access_token")) {
        console.log("No valid reset token found");
        setIsValidToken(false);
        setIsLoading(false);
        return;
      }
      
      try {
        // Extract the type and access token from the URL hash
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const tokenType = hashParams.get("type");
        
        // Verify it's a recovery token
        if (tokenType !== "recovery") {
          console.log("Not a recovery token");
          setIsValidToken(false);
          setIsLoading(false);
          return;
        }
        
        // Check if we can use this token to get user data
        const { data, error } = await supabase.auth.getUser(accessToken);
        
        if (error || !data.user) {
          console.log("Invalid or expired token");
          setIsValidToken(false);
        } else {
          console.log("Valid reset token");
          setIsValidToken(true);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsValidToken(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkResetToken();
  }, [location]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
        <div className="bg-white p-8 shadow-xl rounded-xl w-96 border-t-4 border-purple-600 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your reset link...</p>
        </div>
      </div>
    );
  }
  
  if (!isValidToken) {
    return <Navigate to="/invalid-reset" />;
  }
  
  return children;
};

// The actual Reset Password component
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Password validation
    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setMessage(`❌ ${error.message}`);
      } else {
        setIsSuccess(true);
        setMessage("✅ Password updated successfully!");
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setMessage(`❌ An unexpected error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <div className="bg-white p-8 shadow-xl rounded-xl w-96 border-t-4 border-purple-600">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Create New Password</h2>
        
        {!isSuccess ? (
          <>
            <p className="text-gray-600 mb-6 text-center">
              Please enter your new password below.
            </p>
            
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-green-800 text-center">
              Your password has been updated successfully!
            </p>
            <p className="text-green-700 text-center mt-2">
              Redirecting to login page...
            </p>
          </div>
        )}
        
        {message && !isSuccess && (
          <div className={`mt-4 p-3 rounded-lg text-center ${message.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

// Invalid reset page component


export default function ProtectedResetPasswordFlow() {
  return (
    <ProtectedResetRoute>
      <ResetPassword />
    </ProtectedResetRoute>
  );
}