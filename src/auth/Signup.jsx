import React, { useState } from "react";
import supabase from "/supabaseClient.js";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
      setIsLoading(false);
      return;
    }

    setMessage("✅ Account created successfully! Redirecting...");
    setTimeout(() => {
      window.location.href = "/"; // Redirect to home page
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  to-indigo-100 mt-20">
      <div className="bg-white p-8 shadow-xl rounded-xl w-96 border-t-4 border-purple-600">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Create an Account</h2>
        
        <form onSubmit={handleSignup} className="space-y-5">
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
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <a 
            href="/login" 
            className="inline-block mt-2 text-purple-600 hover:text-purple-800 font-medium underline decoration-2 underline-offset-2"
          >
            Log in here
          </a>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
      
      
    </div>
  );
};

export default Signup;