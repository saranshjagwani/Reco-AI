import React, { useEffect, useState } from "react";
import { fetchTranscriptById } from "../services/transcriptServices";
import { useParams, useNavigate } from "react-router-dom";

const TranscriptDetail = () => {
  const { id } = useParams(); // Get the transcript ID from the URL
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState(null);

  // Fetch the selected transcript
  useEffect(() => {
    const getTranscript = async () => {
      const data = await fetchTranscriptById(id);
      setTranscript(data);
    };
    getTranscript();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 mt-12 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition"
      >
        ⬅ Go Back
      </button>

      {transcript ? (
        <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-bold text-gray-800">{new Date(transcript.created_at).toLocaleString()}</h2>
          <p className="mt-4 text-gray-700">{transcript.content}</p>
        </div>
      ) : (
       
        <p className="text-gray-500">Loading transcript...</p>
      )}
    </div>
  );
};

export default TranscriptDetail;
