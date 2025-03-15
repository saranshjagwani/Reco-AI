import React, { useState, useEffect } from "react";
import { fetchTranscripts } from "../services/transcriptServices";
import { Link } from "react-router-dom";

const TranscriptList = () => {
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTranscripts();
      setTranscripts(data);
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6 mt-12">📜 Saved Transcripts</h2>

      {transcripts.length === 0 ? (
        <p className="text-center text-gray-500">No transcripts available.</p>
      ) : (
        <div className="space-y-4">
          {transcripts.map((item) => (
            <Link to={`/texts/${item.id}`} key={item.id} className="block">
              <div className="p-4 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 transition">
                <p className="text-gray-600 text-lg">
                  📅 {item.created_at ? new Date(item.created_at).toLocaleString() : "Unknown Date"}
                </p>
                <p className="font-medium text-md truncate">{item.content}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranscriptList;
