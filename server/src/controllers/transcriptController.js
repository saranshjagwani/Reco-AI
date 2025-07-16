import supabase from "../config/supabaseclient.js";



// Save transcript to Supabase
export const saveTranscript = async (req, res) => {
  try {
    const { transcript, email } = req.body; // Get transcript & email from request body

    if (!transcript || !email) {
      return res.status(400).json({ error: "Transcript and email are required" });
    }

    const { data, error } = await supabase
      .from("transcripts")
      .insert([{ content: transcript, email }]); // ✅ Save email with transcript

    if (error) throw error;

    res.json({ success: true, message: "Transcript saved!", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTranscripts = async (req, res) => {
  try {
    const { email } = req.query; // Get email from query params

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    // Fetch transcripts where email matches the logged-in user
    const { data, error } = await supabase
      .from("transcripts")
      .select("*")
      .eq("email", email) // ✅ Filter by user email
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  export const getTranscriptById = async (req, res) => {
    const { id } = req.params;
    try {
      const { data, error } = await supabase.from("transcripts").select("*").eq("id", id).single();
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error("Error fetching transcript:", err.message);
      res.status(404).json({ error: "Transcript not found" });
    }
  };