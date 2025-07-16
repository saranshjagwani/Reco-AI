import React, { useState, useRef } from "react";
import { saveTranscriptToBackend } from "../services/transcriptServices";
import AudioUploader from "./AudioUploader";

const VoiceRecorder = () => {
  const [transcript, setTranscript] = useState(""); // Stores final transcript
  const [interimTranscript, setInterimTranscript] = useState(""); // Stores live speech text
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [message, setMessage] = useState(""); 

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef(""); // Stores finalized text
  const lastResultRef = useRef(""); // Stores the last recognized text to prevent duplicates

  // Check browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <p className="text-center text-red-500">❌ Your browser does not support speech recognition. Please use Chrome or Edge.</p>;
  }

  // Start Recording
  const startListening = () => {
    if (isListening) return; // Prevent duplicate instances

    setIsListening(true);
    setIsPaused(false);

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalText = "";
      let liveText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptText = event.results[i][0].transcript.trim();
        
        if (event.results[i].isFinal) {
          // Check if this is a duplicate of the last result (common on mobile)
          if (lastResultRef.current !== transcriptText) {
            finalText += transcriptText + " ";
            lastResultRef.current = transcriptText;
          }
        } else {
          liveText += transcriptText + " ";
        }
      }

      // Append final results without repeating
      if (finalText) {
        finalTranscriptRef.current += finalText;
        setTranscript(finalTranscriptRef.current.trim()); 
      }

      // Show live interim results
      setInterimTranscript(liveText);
    };

    recognition.onend = () => {
      if (!isPaused) setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // Pause Recording
  const pauseListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stops but keeps transcript
      setIsListening(false);
      setIsPaused(true);
    }
  };

  // Stop Recording (Reset Everything)
  const stopListening = () => {
    setIsListening(false);
    setIsPaused(false);
    if (recognitionRef.current) {
      recognitionRef.current.abort(); // Completely stops recognition
      recognitionRef.current = null;
    }
    finalTranscriptRef.current = "";
    lastResultRef.current = ""; // Reset the last result reference
    setTranscript("");
    setInterimTranscript("");
  };

  // Save transcript to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fullTranscript = transcript.trim();
    const userEmail = localStorage.getItem("userEmail"); // ✅ Retrieve email
  
    if (!fullTranscript) {
      setMessage("❌ Please enter a transcript before submitting.");
      return;
    }
  
    if (!userEmail) {
      setMessage("❌ User not logged in.");
      return;
    }
  
    try {
      const response = await fetch("https://recoaibackend.onrender.com/api/transcripts/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: fullTranscript, email: userEmail }), // ✅ Include email
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage("✅ Transcript saved successfully!");
        setTranscript("");
      } else {
        setMessage(`❌ Failed to save: ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ Server error! Please try again.");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-6 mt-20 mb-12">
      {/* Speech to Text Converter */}
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg text-center mb-20 border border-gray-300">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Speech <span className="text-[#6A0DAD]">To Text</span> Converter
        </h2>

        {/* Display Speech-to-Text Result */}
        <textarea
          className="w-full h-48 md:h-56 border border-gray-300 rounded-md p-4 mb-4 overflow-y-auto break-words text-left text-gray-700 bg-gray-100"
          value={transcript + " " + interimTranscript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="🎤 Start speaking, and your words will appear here..."
        />

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <button className="px-4 py-3 bg-[#6A0DAD] text-white rounded-md hover:bg-[#5A0C94] transition" onClick={() => navigator.clipboard.writeText(transcript)}>
            Copy Text
          </button>

          <button className={`px-4 py-3 text-white rounded-md transition ${isListening ? "bg-gray-400 cursor-not-allowed" : "bg-[#6A0DAD] hover:bg-[#5A0C94]"}`} onClick={startListening} disabled={isListening}>
            Start
          </button>

          <button className={`px-4 py-3 text-white rounded-md transition ${!isListening || isPaused ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFA500] hover:bg-[#E69500]"}`} onClick={pauseListening} disabled={!isListening || isPaused}>
            Pause
          </button>

          <button className="px-4 py-3 bg-[#D32F2F] text-white rounded-md hover:bg-[#B71C1C] transition" onClick={stopListening}>
            Stop
          </button>
        </div>

        {/* Save Transcript Button */}
        <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition" onClick={handleSubmit}>
          Save Transcript
        </button>

        {/* Message Box */}
        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </div>
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg text-center border border-gray-300">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Upload Audio File</h2>
        <AudioUploader />
      </div>
    </div>
  );
};

export default VoiceRecorder;
