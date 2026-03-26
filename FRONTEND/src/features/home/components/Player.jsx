import React, { useRef, useState, useEffect } from "react";
import useSong from "../hooks/useSong";
import "../styles/player.scss";

// ✅ Lucide Icons
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Gauge,
} from "lucide-react";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const Player = () => {
  const { song, playNext, playPrev } = useSong();

  const audioRef = useRef(null);
  const progressRef = useRef(null);
// ... rest of state declarations
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [song?.URL]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const skip = (secs) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + secs, 0),
      duration,
    );
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (s) => {
    setSpeed(s);
    audioRef.current.playbackRate = s;
    setShowSpeed(false);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!song) return null;

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={song.URL}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* LEFT */}
      <div className="player__left">
        <img className="player__poster" src={song.posterURL} alt={song.title} />
        <div className="player__meta">
          <p className="player__title">{song.title}</p>
          <span className="player__mood">{song.mood}</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="player__center">
        {/* Controls */}
        <div className="player__controls">
          <button onClick={() => playPrev()}>
            <SkipBack size={18} />
          </button>

          <button onClick={togglePlay} className="player__play-btn">
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>

          <button onClick={() => playNext()}>
            <SkipForward size={18} />
          </button>
        </div>

        {/* Progress */}
        <div className="player__progress-wrap">
          <span className="player__time">{formatTime(currentTime)}</span>

          <div
            className="player__progress"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div
              className="player__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="player__time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="player__right">
        {/* Speed */}
        <div className="player__speed">
          <button onClick={() => setShowSpeed(!showSpeed)}>
            <Gauge size={16} /> {speed}x
          </button>

          {showSpeed && (
            <div className="player__speed-menu">
              {SPEED_OPTIONS.map((s) => (
                <button key={s} onClick={() => handleSpeedChange(s)}>
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Volume */}
        <div className="player__volume">
          <button onClick={toggleMute}>
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
