import React, { useState } from "react";
import { saveTranscriptToBackend, uploadAudio } from "../services/transcriptServices";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [message, setMessage] = useState(""); // ✅ Success/Error messages
  const [loading, setLoading] = useState(false); // ✅ Loading state

  // 🔹 Handle Audio Upload
  const handleUpload = async () => {
    if (!file) return alert("Please select an audio file.");
    
    setLoading(true);
    const result = await uploadAudio(file);
    setLoading(false); 

    if (result) setTranscription(result);
  };

  // 🔹 Save Transcription to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullTranscript = transcription.trim();

    if (!fullTranscript) {
      setMessage("❌ Please enter a transcript before submitting.");
      return;
    }

    setLoading(true); // ✅ Show loading before saving
    const result = await saveTranscriptToBackend(fullTranscript);
    setLoading(false); // ✅ Hide loading after saving

    if (result.success) {
      setMessage("✅ Transcript saved successfully!");
      setTranscription(""); // ✅ Clear after saving
    } else {
      setMessage(result.error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 mt-12">🎤 Upload Audio File</h2>

      {/* File Input */}
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading} // ✅ Disable while loading
      >
        {loading ? "Uploading..." : "Upload & Transcribe"}
      </button>

      {/* Show transcription if available */}
      {transcription && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="font-bold">📝 Transcription:</h3>
          <p>{transcription}</p>

          {/* Copy Button */}
          <button
            className="px-4 py-3 bg-[#6A0DAD] text-white rounded-md hover:bg-[#5A0C94] transition"
            onClick={() => navigator.clipboard.writeText(transcription)}
          >
            Copy Text
          </button>

          {/* Save Button */}
          <button
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            onClick={handleSubmit}
            disabled={loading} // ✅ Disable while saving
          >
            {loading ? "Saving..." : "Save Transcript"}
          </button>

          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default AudioUploader;
