import axios from "axios";
export const saveTranscriptToBackend = async (transcript, email) => {
  try {
    const response = await fetch("https://recoaibackend.onrender.com/api/transcripts/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, email }), // ✅ Send email with transcript
    });

    const result = await response.json();
    return response.ok ? { success: true, message: result.message } : { success: false, error: result.error };
  } catch (error) {
    return { success: false, error: "❌ Server error! Please try again." };
  }
};


const BASE_URL = "https://recoaibackend.onrender.com/api/transcripts"; // ✅ Update if needed

// ✅ Fetch All Transcripts
export const fetchTranscripts = async () => {
  const userEmail = localStorage.getItem("userEmail"); // ✅ Get email from localStorage

  if (!userEmail) {
    return [];
  }

  try {
    const response = await fetch(`https://recoaibackend.onrender.com/api/transcripts/get?email=${userEmail}`);
    const data = await response.json();
    return response.ok ? data : [];
  } catch (error) {
    console.error("Error fetching transcripts:", error);
    return [];
  }
};


// ✅ Fetch a single transcript by ID
export const fetchTranscriptById = async (id) => {
  try {
    const response = await fetch(`https://recoaibackend.onrender.com/api/transcripts/get/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched Transcript:", data);
    return data;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return null;
  }
};



// Upload Audio File
export const uploadAudio = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioFile);

    const response = await axios.post("https://recoaibackend.onrender.com/api/transcripts/upload-audio", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.transcription;
  } catch (error) {
    console.error("❌ Error uploading audio:", error);
    return null;
  }
};
