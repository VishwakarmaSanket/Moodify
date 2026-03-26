# 🎵 Moodify

> A mood-based music web application that detects your facial expression in real-time and recommends songs that match how you feel.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [How It Works](#-how-it-works)
- [User Journey](#-user-journey)
- [Key Design Decisions](#-key-design-decisions)
- [Known Limitations](#-known-limitations)
- [Contributing](#-contributing)

---

## 🧠 Overview

Moodify is a full-stack web application built as an academic project. It uses your device's webcam and the **MediaPipe Face Landmarker** model to detect your current facial expression, then queries a MongoDB database for songs tagged with that mood and plays them directly in the browser.

Since this is a project (not a commercial product), **there are no licensed songs** bundled in. Instead, users contribute songs by uploading MP3/WAV files and tagging them with a mood. Those songs are stored via **ImageKit** and become available for everyone's recommendations.

---

## 🚀 Live Demo

> **[https://moodify-2-o6jl.onrender.com](https://moodify-2-o6jl.onrender.com)**
>
> ⚠️ Hosted on Render's free tier — the server may take **30–60 seconds** to wake up on first load after inactivity. Please be patient.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎭 **Real-time mood detection** | Uses MediaPipe Face Landmarker to detect happy, sad, surprised, and neutral expressions from your webcam |
| 🎵 **Mood-based playlist** | Fetches all songs matching your detected mood from the database and queues them as a playlist |
| ⬆️ **Song upload** | Users can upload their own MP3/WAV files with a mood tag — songs are stored on ImageKit CDN |
| 🕹️ **Manual mood selection** | Can't or don't want to use the webcam? Select your mood manually with emoji quick-select buttons |
| 📊 **Mood stats** | Bar chart showing your mood distribution over the current week |
| 🕓 **Mood history** | Timestamped list of your recent mood detections |
| 🔐 **Authentication** | JWT-based login and registration with token blacklisting via Redis on logout |
| 🎛️ **Full-featured player** | Play/pause, previous/next track, volume control, playback speed selector, progress scrubbing |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18 + Vite** | UI framework and build tool |
| **React Router v6** | Client-side routing |
| **SCSS (Sass)** | Component-scoped styling |
| **Axios** | HTTP client for API calls |
| **MediaPipe Tasks-Vision** | In-browser face landmark detection and expression classification |
| **Context API** | Global state for auth, song playlist, and active song |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Primary database for users, songs, and mood history |
| **Redis** | JWT token blacklist (logout invalidation) |
| **ImageKit** | CDN storage for uploaded song files and poster images |
| **Multer** | Multipart file upload middleware |
| **node-id3** | Reads ID3 tags (title, embedded artwork) from uploaded MP3s |
| **bcrypt** | Password hashing |
| **jsonwebtoken** | JWT generation and verification |

---

## 📁 Project Structure

```
Moodify/
├── BACKEND/
│   ├── server.js                    # Entry point — starts Express server
│   ├── src/
│   │   ├── app.js                   # Express app setup, middleware, route mounting
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   └── cache.js             # Redis connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js   # register, login, logout handlers
│   │   │   ├── song.controller.js   # uploadSong, getSongs handlers
│   │   │   └── mood.controller.js   # saveMood, getMoodStats, getMoodHistory
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js   # JWT verification, blacklist check
│   │   │   └── upload.middleware.js # Multer config for audio files
│   │   ├── models/
│   │   │   ├── user.model.js        # User schema (username, email, password)
│   │   │   ├── song.model.js        # Song schema (URL, posterURL, title, mood)
│   │   │   ├── mood.model.js        # MoodEntry schema (userId, mood, timestamp)
│   │   │   └── blacklist.model.js   # Blacklisted JWT tokens
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # POST /api/auth/register, /login, /logout
│   │   │   └── song.routes.js       # GET /api/songs, POST /api/songs
│   │   └── services/
│   │       └── storage.service.js   # ImageKit upload wrapper
│   └── package.json
│
├── FRONTEND/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx                 # React root
│       ├── App.jsx                  # Router provider + context providers
│       ├── app.routes.jsx           # Route definitions
│       ├── features/
│       │   ├── auth/
│       │   │   ├── pages/
│       │   │   │   ├── LoginPage.jsx
│       │   │   │   └── RegisterPage.jsx
│       │   │   ├── components/
│       │   │   │   ├── Form_Container.jsx
│       │   │   │   ├── Form_Group.jsx
│       │   │   │   ├── LeftLogin.jsx
│       │   │   │   └── MoodifyIcon.jsx
│       │   │   ├── hooks/
│       │   │   │   └── useAuth.js
│       │   │   ├── services/
│       │   │   │   └── auth.api.js
│       │   │   ├── style/
│       │   │   └── auth.context.jsx
│       │   ├── home/
│       │   │   ├── pages/
│       │   │   │   └── Home.jsx         # Main layout (Navbar + 3 columns + Player)
│       │   │   ├── components/
│       │   │   │   ├── Player.jsx       # Bottom audio player bar
│       │   │   │   ├── Navbar.jsx       # Top navigation bar
│       │   │   │   ├── LeftPanel.jsx    # Tab switcher (Discover / Upload)
│       │   │   │   ├── DiscoverTab.jsx  # Mood stats, manual tags, history
│       │   │   │   ├── UploadTab.jsx    # Song upload form
│       │   │   │   └── Playlist.jsx    # Right panel — now playing + song list
│       │   │   ├── hooks/
│       │   │   │   └── useSong.js
│       │   │   ├── services/
│       │   │   │   ├── song.api.js
│       │   │   │   ├── mood.api.js
│       │   │   │   └── upload.api.js
│       │   │   ├── styles/
│       │   │   └── song.context.jsx     # Playlist, activeSongIndex global state
│       │   ├── Expressions/
│       │   │   ├── components/
│       │   │   │   └── FaceExpression.jsx  # Webcam + MediaPipe detection loop
│       │   │   ├── utils/
│       │   │   │   └── utils.js            # MediaPipe init + blendshape → mood logic
│       │   │   └── style/
│       │   └── shared/
│       │       └── style/
│       │           ├── global.scss
│       │           └── button.scss
│       └── assets/
│
└── redis.md                         # Redis setup notes
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** — running locally on `mongodb://localhost:27017` or a MongoDB Atlas URI
- **Redis** — running locally on `localhost:6379` (see [`redis.md`](./redis.md) for setup)
- **ImageKit account** — free tier is sufficient ([imagekit.io](https://imagekit.io))

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd BACKEND

# 2. Install dependencies
npm install

# 3. Create your .env file (see Environment Variables section below)
cp .env.example .env   # or create manually

# 4. Start the development server
npm run dev
```

The backend will start on **`http://localhost:3000`**.

Make sure MongoDB and Redis are both running before starting the server.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd FRONTEND

# 2. Install dependencies
npm install

# 3. Start the Vite dev server
npm run dev
```

The frontend will start on **`http://localhost:5173`**.

> **Note:** The frontend expects the backend to be running on `http://localhost:3000`. If you change the backend port, update the `baseURL` in `src/features/home/services/song.api.js` and `src/features/auth/services/auth.api.js`.

---

## 🔑 Environment Variables

Create a `.env` file inside the `BACKEND/` directory with the following variables:

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/moodify
# Or use Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/moodify

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Create a new user account |
| `POST` | `/api/auth/login` | No | Login and receive a JWT cookie |
| `POST` | `/api/auth/logout` | Yes | Invalidate token via Redis blacklist |

**Register body:**
```json
{ "username": "tony", "email": "tony@example.com", "password": "secret123" }
```

**Login body:**
```json
{ "email": "tony@example.com", "password": "secret123" }
```

---

### Songs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/songs?song=happy` | Yes | Get all songs matching a mood tag |
| `POST` | `/api/songs` | Yes | Upload a new song (`multipart/form-data`) |

**GET /api/songs response:**
```json
{
  "success": true,
  "message": "Songs fetched successfully",
  "data": [
    {
      "_id": "...",
      "title": "Blinding Lights",
      "URL": "https://ik.imagekit.io/.../song.mp3",
      "posterURL": "https://ik.imagekit.io/.../poster.jpg",
      "mood": "happy"
    }
  ]
}
```

**POST /api/songs — multipart/form-data fields:**

| Field | Type | Description |
|---|---|---|
| `song` | `File` | Audio file (MP3/WAV). Must have embedded ID3 tags (title + artwork). |
| `mood` | `String` | One of: `happy`, `sad`, `surprised`, `neutral`, `calm`, `energetic`, `angry` |

---

### Moods

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/moods/save` | Yes | Save a detected mood entry |
| `GET` | `/api/moods/stats` | Yes | Get mood frequency counts for the week |
| `GET` | `/api/moods/history` | Yes | Get recent mood history with timestamps |

---

## ⚙️ How It Works

### Mood Detection Pipeline

```
Webcam feed (video element)
        ↓
MediaPipe Face Landmarker (runs in browser, no server needed)
        ↓
Extracts 52 face blendshape scores every animation frame
        ↓
utils.js maps blendshapes → mood string:
  mouthSmileLeft > 0.5 && mouthSmileRight > 0.5  → "happy"
  jawOpen > 0.2 && browInnerUp > 0.2             → "surprised"
  mouthFrownLeft > 0.05 && mouthFrownRight > 0.05 → "sad"
  default                                          → "neutral"
        ↓
User clicks "Detect my mood"
        ↓
getSongHandler({ mood }) called in useSong.js
        ↓
Parallel: saveMood(mood) + GET /api/songs?song=mood
        ↓
Playlist loaded into song.context → Player starts
```

### Song Upload Pipeline

```
User selects audio file (MP3/WAV)
        ↓
Fills in: song title, artist name, mood tag
        ↓
POST /api/songs (multipart/form-data)
        ↓
Backend reads ID3 tags from buffer (title, embedded artwork)
        ↓
ImageKit upload runs in parallel:
  - Audio file → /Cohort2/Moodify/Songs/
  - Artwork    → /Cohort2/Moodify/Posters/
        ↓
Song document saved in MongoDB with CDN URLs
        ↓
Song is now available in recommendations for all users
```

### Authentication Flow

```
Register / Login → JWT issued as httpOnly cookie
        ↓
All protected routes → auth.middleware.js checks:
  1. Cookie present?
  2. JWT valid signature?
  3. Token in Redis blacklist? (if blacklisted → 401)
        ↓
Logout → token hash added to Redis blacklist
       → cookie cleared
```

---

## 🗺 User Journey

```
1. Landing         →  /login  or  /register
2. Authenticate    →  JWT cookie set, redirect to /
3. Home page loads →  3-column layout:
                       LEFT:   Discover tab (mood stats, manual tags, history)
                                or Upload tab (add songs to database)
                       CENTER: Webcam feed + "Detect my mood" button
                       RIGHT:  Recommended playlist + Now playing card
                       BOTTOM: Persistent audio player bar
4. Detect mood     →  Face captured → mood identified → playlist loaded
5. Listen          →  Player auto-starts, can skip prev/next, adjust volume/speed
6. Manual override →  Click emoji tag in Discover tab → same flow as detection
7. Contribute      →  Switch to Upload tab → add songs for others to discover
```

---

## 🏗 Key Design Decisions

**Why user-uploaded songs instead of a music API?**
This is an academic project without commercial licensing. Rather than using Spotify or Apple Music APIs (which have complex auth flows and restrictions), users contribute their own audio files, making the app self-contained and fully functional without third-party dependencies.

**Why MediaPipe in the browser instead of a server-side model?**
Running the face landmarker model client-side means zero latency for detection — no image needs to be sent to a server. The WASM-based MediaPipe model runs at real-time framerate entirely in the user's browser.

**Why Redis for JWT blacklisting?**
Stateless JWT tokens cannot be invalidated server-side once issued. Using Redis as a fast, TTL-based store for blacklisted tokens allows secure logout without storing full session state.

**Why ImageKit for file storage?**
ImageKit provides a free CDN with transformation capabilities. Audio files and poster images are served from the CDN edge, reducing latency for playback globally.

**Why Context API instead of Redux?**
The state tree is shallow — just auth user, playlist array, and active song index. Context API with custom hooks (`useSong`, `useAuth`) is sufficient and avoids the boilerplate overhead of Redux for a project of this scale.

---

## ⚠️ Known Limitations

- **Mood detection accuracy** — The expression classifier uses simple blendshape thresholds. It works best in good lighting with a clear view of the face. Complex or subtle expressions may not be detected reliably.
- **Song availability** — Since songs are user-uploaded, the database may have few or no songs for a given mood initially. Upload some before testing recommendations.
- **MP3 ID3 tags required** — The upload feature reads the song title and embedded artwork directly from the MP3 file's ID3 tags. Files without proper ID3 tags (title, embedded cover art) will fail to upload. Tag your files using a tool like [Mp3tag](https://www.mp3tag.de/en/) before uploading.
- **No shuffle/repeat yet** — The player plays songs in the order they are returned from the database. Shuffle and repeat are not yet implemented.
- **Mobile layout** — The 3-column dashboard layout is designed for desktop. Mobile responsiveness is partial.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your MP3 files have proper ID3 tags (title + embedded artwork) before uploading via the app.

---

## 👤 Author

**Sanket Vishwakarma**
Computer Engineering — Savitribai Phule Pune University (SPPU), T.E. 2019 Course Structure

---

<p align="center">Made with ☕ and late nights</p>
