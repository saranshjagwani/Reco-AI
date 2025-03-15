import React, { useState } from "react";
import { saveTranscriptToBackend, uploadAudio } from "../services/transcriptServices";
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaCopy, FaSave } from "react-icons/fa";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select an audio file.");
    
    setLoading(true);
    const result = await uploadAudio(file);
    setLoading(false);
    
    if (result) setTranscription(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!transcription.trim()) {
      setMessage("❌ Please enter a transcript before submitting.");
      return;
    }
  
    const userEmail = localStorage.getItem("userEmail"); // ✅ Get email from localStorage
    if (!userEmail) {
      setMessage("❌ User not logged in.");
      return;
    }
  
    setLoading(true);
    const result = await saveTranscriptToBackend(transcription.trim(), userEmail); // ✅ Pass email
    setLoading(false);
  
    if (result.success) {
      setMessage("✅ Transcript saved successfully!");
      setSaved(true);
      setTranscription("");
    } else {
      setMessage(result.error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-purple-300 to-blue-300 rounded-2xl">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg text-center border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Upload & Transcribe</h2>
        
        {/* File Upload */}
        <label className="cursor-pointer flex flex-col items-center p-6 border-2 border-dashed border-gray-400 rounded-xl hover:border-purple-500 transition bg-gray-50">
          <FaCloudUploadAlt className="text-purple-600 text-5xl mb-3" />
          <span className="text-gray-600 font-medium">{file ? file.name : "Click to upload an audio file"}</span>
          <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
        </label>
        
        <button
          onClick={handleUpload}
          className="mt-5 w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition flex items-center justify-center gap-2 text-lg shadow-md"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Upload & Transcribe"}
        </button>

        {/* Transcription Display */}
        {transcription && (
          <div className="mt-6 bg-gray-100 p-5 rounded-xl border border-gray-300 text-left shadow-md">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">📝 Transcription:</h3>
            <p className="text-gray-700 break-words">{transcription}</p>
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2"
                onClick={() => navigator.clipboard.writeText(transcription)}
              >
                <FaCopy /> Copy Text
              </button>
              <button
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Transcript
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {saved && (
          <div className="mt-4 flex items-center justify-center gap-2 bg-green-100 p-3 rounded-xl text-green-800 shadow-md">
            <FaCheckCircle /> Transcript saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUploader;