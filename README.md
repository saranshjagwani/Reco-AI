<h1 align="center">🧠 RecoAI - AI-Powered Speech-to-Text & Transcription</h1>
<h3 align="center">🎤 Upload Audio | 🎙️ Live Transcription | 💾 Save & Query Data</h3>

🚀 **RecoAI** is a cutting-edge AI-powered speech-to-text platform that allows users to:
- **🎙️ Live Transcribe**: Convert speech into text in real time.
- **🎤 Upload Audio Files**: Transcribe recorded audio files (MP3, WAV, etc.).
- **💾 Save & Manage Transcripts**: Store transcriptions securely in a database.
- **🗣️ Chat with Transcriptions**: Query past transcriptions like an interactive assistant.
- **🔒 User Authentication**: Secure login & signup with Supabase.
- **📊 Botpress Integration**: AI-powered conversation with stored transcripts.

---

## 🛠 **Tech Stack**
- **Frontend:** ⚛️ React.js, Tailwind CSS
- **Backend:** 🟢 Node.js, Express.js
- **Database:** 🛢️ Supabase
- **Authentication:** 🔐 Supabase Auth
- **AI API:** 🎧 AssemblyAI (for transcription)
- **Hosting:** 🌍 Netlify (Frontend), Render (Backend)

---

## 🌟 **Features**
### 🎙️ **Live Speech-to-Text**
- Uses **Web Speech API** for real-time transcription.
- Provides **interim & final results** for better accuracy.
- **Copy & Save** transcripts with one click.

### 🎤 **Audio File Transcription**
- Upload **MP3, WAV** files & convert them to text.
- Uses **AssemblyAI API** for high-accuracy transcription.
- Save transcripts for later reference.

### 🔐 **User Authentication**
- **Signup/Login** with Supabase Auth.
- User data stored securely.
- **Password Reset** functionality.

### 💾 **Save & Query Transcripts**
- **Filter & Search** stored transcriptions.
- **View details** of each transcript.
- User-specific storage: **Each user sees only their transcripts.**

### 🤖 **Botpress AI Integration**
- AI-powered chatbot connected to stored transcripts.
- Query past transcriptions **like a personal assistant.**

---

## 🚀 **Getting Started**
### 🔹 **Clone the Repository**
```bash
git clone https://github.com/saranshjagwani/RecoAI.git
cd RecoAI

<h2>🔹 Setup the Backend</h2>

<h3>📦 Install dependencies:</h3>
<pre>
<code>
cd server
npm install
</code>
</pre>

<h3>⚙️ Create a <code>.env</code> file in <code>server</code> and add:</h3>
<pre>
<code>
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
ASSEMBLYAI_API_KEY=your-api-key
</code>
</pre>

<h3>🚀 Run the server:</h3>
<pre>
<code>
npm start
</code>
</pre>
<p>The server will start at <a href="http://localhost:5000">http://localhost:5000</a>.</p>

---

<h2>🔹 Setup the Frontend</h2>

<h3>📦 Install dependencies:</h3>
<pre>
<code>
cd client
npm install
</code>
</pre>

<h3>⚙️ Create a <code>.env</code> file in <code>client</code> and add:</h3>
<pre>
<code>
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
</code>
</pre>

<h3>🚀 Start the frontend:</h3>
<pre>
<code>
npm run dev
</code>
</pre>
<p>The frontend will be available at <a href="http://localhost:5173">http://localhost:5173</a>.</p>

---

<h2>🎯 Usage</h2>
<ul>
  <li>🔑 <strong>Login/Signup</strong> to access transcripts.</li>
  <li>🎙️ <strong>Use Live Transcribe</strong> to convert speech to text.</li>
  <li>🎤 <strong>Upload an audio file</strong> for AI-powered transcription.</li>
  <li>💾 <strong>Save & Manage</strong> transcriptions in your dashboard.</li>
  <li>🤖 <strong>Chat with your transcripts</strong> via Botpress AI.</li>
</ul>
