import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

// 🔹 Function to Upload Audio to AssemblyAI & Get Transcription
export const uploadAudioToAssemblyAI = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log(`✅ File received: ${req.file.originalname}`);

    // Step 1: Upload audio file to AssemblyAI
    const uploadResponse = await axios.post(
      "https://api.assemblyai.com/v2/upload",
      req.file.buffer,
      {
        headers: {
          "Authorization": ASSEMBLYAI_API_KEY,
          "Content-Type": "application/octet-stream",
        },
      }
    );

    const audioUrl = uploadResponse.data.upload_url;
    console.log(`🔗 Audio URL: ${audioUrl}`);

    // Step 2: Request transcription
    const transcriptionResponse = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      { audio_url: audioUrl },
      {
        headers: {
          "Authorization": ASSEMBLYAI_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const transcriptionId = transcriptionResponse.data.id;
    console.log(`📝 Transcription ID: ${transcriptionId}`);

    // Step 3: Fetch Transcription
    setTimeout(async () => {
      try {
        const transcriptResult = await axios.get(
          `https://api.assemblyai.com/v2/transcript/${transcriptionId}`,
          {
            headers: { Authorization: ASSEMBLYAI_API_KEY },
          }
        );

        res.json({
          transcription: transcriptResult.data.text,
        });
      } catch (fetchError) {
        console.error("❌ Error fetching transcription:", fetchError);
        res.status(500).json({ error: "Failed to fetch transcription" });
      }
    }, 5000); // Wait 5 seconds before fetching transcription
  } catch (error) {
    console.error("❌ Error processing audio:", error);
    res.status(500).json({ error: "Failed to process audio" });
  }
};
