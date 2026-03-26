import React, { useState } from "react";
import { uploadSong } from "../services/song.api";
import "../styles/upload.scss";

const Upload = () => {
  const [mood, setMood] = useState("happy");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ text: "Please select an MP3 file", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("song", file);
    formData.append("mood", mood);

    try {
      setLoading(true);
      setMessage({ text: "Uploading...", type: "" });
      const response = await uploadSong(formData);
      if (response.success) {
        setMessage({ text: "Song uploaded successfully!", type: "success" });
        setFile(null);
        e.target.reset();
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage({
        text:
          error.response?.data?.message ||
          "Upload failed. Make sure the file has ID3 tags (Title and Image).",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploadTab">
      <h4>Upload New Music</h4>
      <form className="uploadForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Select Mood</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option value="happy">Happy 😊</option>
            <option value="sad">Sad 😢</option>
            <option value="calm">Calm 😌</option>
            <option value="energetic">Energy ⚡</option>
            <option value="angry">Angry 😠</option>
            <option value="surprised">Surprised 😮</option>
            <option value="neutral">Neutral 😐</option>
          </select>
        </div>

        <div className="formGroup">
          <label>MP3 File (must have title and cover image tags)</label>
          <input type="file" accept="audio/mpeg" onChange={handleFileChange} />
        </div>

        <button type="submit" className="uploadBtn" disabled={loading}>
          {loading ? "Uploading..." : "Upload Song"}
        </button>

        {message.text && (
          <p className={`statusMsg ${message.type}`}>{message.text}</p>
        )}
      </form>
    </div>
  );
};

export default Upload;
