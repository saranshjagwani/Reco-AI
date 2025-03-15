import React, { useState } from "react";
import supabase from "/supabaseClient.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Supabase password reset
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setMessage(`❌ ${error.message}`);
      } else {
        setIsSubmitted(true);
        setMessage("✅ Password reset link sent to your email!");
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
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Reset Password</h2>
        
        {!isSubmitted ? (
          <>
            <p className="text-gray-600 mb-6 text-center">
              Enter your email address below and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 text-center">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions to reset your password.
            </p>
          </div>
        )}
        
        {message && !isSubmitted && (
          <div className={`mt-4 p-3 rounded-lg text-center ${message.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">Remember your password?</p>
          <a 
            href="/login" 
            className="inline-block mt-2 text-purple-600 hover:text-purple-800 font-medium underline decoration-2 underline-offset-2"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;