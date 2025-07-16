import express from "express";
import upload from "../middleware/upload.js";
import { uploadAudioToAssemblyAI } from "../controllers/audioController.js";
import { saveTranscript, getTranscripts, getTranscriptById } from "../controllers/transcriptController.js";


const router = express.Router();

router.post("/save", saveTranscript);
router.get("/get", getTranscripts);
router.post("/upload-audio", upload.single("audio"), uploadAudioToAssemblyAI);
router.get("/get/:id", getTranscriptById);


export default router;
