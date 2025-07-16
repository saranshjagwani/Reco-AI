import React from "react";
import { FaRecycle, FaMicrophone, FaFileAudio, FaCloud } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-r mt-20">
      <div className="max-w-3xl bg-white p-8 rounded-3xl shadow-xl text-center border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About <span className="text-[#6A0DAD]">RecoAI</span></h1>
        <p className="text-gray-700 text-lg mb-6">
          RecoAI is an AI-powered Speech-to-Text and Audio Transcription platform that helps users convert their voice and audio files into text instantly.  
          It is designed to enhance productivity by making conversations, meetings, and recordings searchable and accessible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-900">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-xl shadow-md">
            <FaMicrophone className="text-purple-600 text-5xl mb-3" />
            <h3 className="font-bold text-xl">Live Transcription</h3>
            <p className="text-gray-600 text-sm mt-2">Convert speech to text in real-time using AI.</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-xl shadow-md">
            <FaFileAudio className="text-blue-600 text-5xl mb-3" />
            <h3 className="font-bold text-xl">Audio Upload</h3>
            <p className="text-gray-600 text-sm mt-2">Upload recorded files and get accurate transcriptions.</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-xl shadow-md">
            <FaCloud className="text-green-600 text-5xl mb-3" />
            <h3 className="font-bold text-xl">Cloud Storage</h3>
            <p className="text-gray-600 text-sm mt-2">Securely store and access transcripts anytime.</p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-xl shadow-md">
            <FaRecycle className="text-red-600 text-5xl mb-3" />
            <h3 className="font-bold text-xl">Sustainability Focus</h3>
            <p className="text-gray-600 text-sm mt-2">Eco-friendly AI that reduces paper usage.</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-700">Join us in revolutionizing voice technology and making transcription seamless! 🎤✨</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
