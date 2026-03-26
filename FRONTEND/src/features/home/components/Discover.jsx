import React, { useEffect, useState } from "react";
import { getMoodHistory, getMoodStats } from "../services/mood.api";
import "../styles/discover.scss";

const MOOD_CONFIG = {
  happy: { label: "Ha", color: "#1db954", emoji: "😊", fullName: "Happy" },
  calm: { label: "Ca", color: "#7c6af7", emoji: "😌", fullName: "Calm" },
  sad: { label: "Sa", color: "#378ADD", emoji: "😢", fullName: "Sad" },
  energetic: { label: "En", color: "#EF9F27", emoji: "⚡", fullName: "Energy" },
  energy: { label: "En", color: "#EF9F27", emoji: "⚡", fullName: "Energy" },
  angry: { label: "An", color: "#E24B4A", emoji: "😠", fullName: "Angry" },
  surprised: {
    label: "Su",
    color: "#9c27b0",
    emoji: "😮",
    fullName: "Surprised",
  },
  neutral: { label: "Ne", color: "#888888", emoji: "😐", fullName: "Neutral" },
};

const MOOD_TAGS = [
  { label: "Happy", emoji: "😊", value: "happy" },
  { label: "Calm", emoji: "😌", value: "calm" },
  { label: "Sad", emoji: "😢", value: "sad" },
  { label: "Energy", emoji: "⚡", value: "energetic" },
  { label: "Angry", emoji: "😠", value: "angry" },
  { label: "Surprised", emoji: "😮", value: "surprised" },
];

const Discover = ({ onMoodSelect, refreshTrigger }) => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [historyRes, statsRes] = await Promise.all([
          getMoodHistory(),
          getMoodStats(),
        ]);

        if (historyRes.success) {
          setHistory(historyRes.mood);
        }

        if (statsRes.success) {
          // Convert moodCounts object to array for mapping
          const statsArray = Object.entries(statsRes.moodCounts).map(
            ([mood, percentage]) => ({
              mood,
              percentage,
            }),
          );
          setStats(statsArray);
        }
      } catch (error) {
        console.error("Failed to fetch mood data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="discoverTab">
      {/* 🔹 Section 1: Mood Stats */}
      <div className="section">
        <h4>Mood Stats</h4>
        <div className="moodStats">
          {loading ? (
            <p>Loading stats...</p>
          ) : stats.length > 0 ? (
            stats.map((item, index) => {
              const config =
                MOOD_CONFIG[item.mood.toLowerCase()] || MOOD_CONFIG.neutral;
              return (
                <div key={index} className="barWrapper">
                  <div
                    className="bar"
                    style={{
                      height: `${item.percentage}%`,
                      background: config.color,
                    }}
                  ></div>
                  <span>{config.label}</span>
                </div>
              );
            })
          ) : (
            <p>No stats yet</p>
          )}
        </div>
      </div>

      {/* 🔹 Section 2: Mood Tags */}
      <div className="section">
        <h4>Quick Mood</h4>
        <div className="moodTags">
          {MOOD_TAGS.map((tag, index) => (
            <button
              key={index}
              onClick={() => onMoodSelect(tag.value)}
              className="tag"
            >
              <span>{tag.emoji}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Section 3: Mood History */}
      <div className="section">
        <h4>History</h4>
        <div className="history">
          {loading ? (
            <p>Loading history...</p>
          ) : history.length > 0 ? (
            history.map((item, index) => {
              const config =
                MOOD_CONFIG[item.mood.toLowerCase()] || MOOD_CONFIG.neutral;
              const date = new Date(item.date);
              const timeString = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div key={index} className="historyItem">
                  <span
                    className="dot"
                    style={{ background: config.color }}
                  ></span>
                  <p>{config.fullName}</p>
                  <span className="time">{timeString}</span>
                </div>
              );
            })
          ) : (
            <p>No history yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
