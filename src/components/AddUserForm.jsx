import React, { useState } from 'react';

export default function AddUserForm({ onAdd }) {
  // State management for form inputs and UI states
  const [username, setUsername] = useState('');
  const [img, setImg] = useState('');
  const [previewUrl, setPreviewUrl] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  /**
   * Handles form submission with enhanced error handling and loading states
   * @param {Event} e - Form submission event
   */
  const handleAddUser = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate required fields
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // Make API request to add user
      const res = await fetch('https://leaderboard-backend-r8zw.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          img: img.trim() === '' ? undefined : img.trim()
        })
      });

      if (!res.ok) {
        throw new Error('Failed to add user');
      }

      // Show success animation
      setIsSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setUsername('');
        setImg('');
        setPreviewUrl("https://cdn-icons-png.flaticon.com/512/149/149071.png");
        setIsSuccess(false);
        setIsLoading(false);
        
        // Call parent callback if provided
        if (onAdd) onAdd();
      }, 1500);

    } catch (err) {
      // Handle API errors
      setError(err.message || 'Failed to add user. Please try again.');
      setIsLoading(false);
      
      // Auto-clear error after 5 seconds
      setTimeout(() => setError(''), 5000);
      
      console.error('Error adding user:', err);
    }
  };

  /**
   * Handles image URL changes with validation and preview updates
   * @param {Event} e - Input change event
   */
  const handleImgChange = (e) => {
    const val = e.target.value;
    setImg(val);
    setError(''); // Clear any previous errors
    
    // Update preview URL with fallback
    if (val.trim()) {
      setIsImageLoading(true);
      setPreviewUrl(val.trim());
    } else {
      setPreviewUrl("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    }
  };

  /**
   * Handles image loading completion
   */
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  /**
   * Handles image loading errors with fallback
   * @param {Event} e - Image error event
   */
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    setIsImageLoading(false);
    if (img.trim()) {
      setError('Invalid image URL. Using default avatar.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
      {/* Subtle background elements - positioned behind content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main form container with glassmorphism effect */}
      <div className="relative z-10 w-full max-w-md">
        <form 
          onSubmit={handleAddUser} 
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl transform transition-all duration-500 hover:bg-white/10 hover:shadow-amber-500/10"
        >
          {/* Header section with animated icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold  mb-2 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Add New User
            </h2>
            <p className="text-white/60 text-sm font-medium">Join the leaderboard competition</p>
          </div>

          {/* Avatar preview section with loading state */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/10">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={previewUrl}
                    alt="User Preview"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className="w-full h-full rounded-full object-cover transition-all duration-300"
                  />
                </div>
              </div>
              
              {/* Success badge */}
              {isSuccess && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Error message with animation */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm animate-fadeIn">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Username input with floating label effect */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder=" "
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 peer"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="absolute left-4 top-4 text-white/70 text-sm transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-gray-900 peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-purple-400 peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded">
              Username
            </label>
          </div>

          {/* Image URL input with floating label effect */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder=" "
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 peer"
              value={img}
              onChange={handleImgChange}
            />
            <label className="absolute left-4 top-4 text-white/70 text-sm transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-gray-900 peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-purple-400 peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded">
              Image URL (optional)
            </label>
          </div>

          {/* Submit button with loading animation */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              isLoading || isSuccess
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Adding User...
              </div>
            ) : isSuccess ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                User Added Successfully!
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add User
              </div>
            )}
          </button>

          {/* Helper text */}
          <p className="text-center text-gray-400 text-xs mt-4">
            Leave image URL empty for default avatar
          </p>
        </form>
      </div>

     
    </div>
  );
}