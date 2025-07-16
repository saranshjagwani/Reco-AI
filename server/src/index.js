import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transcriptRoutes from "./routes/transcriptRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct route prefix
app.use("/api/transcripts", transcriptRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
