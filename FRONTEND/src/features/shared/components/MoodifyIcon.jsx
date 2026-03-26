import React from "react";

const MoodifyIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="moodifyGradient" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#6366f1" />
        </linearGradient>
      </defs>

      <circle
        cx="24"
        cy="24"
        r="22"
        fill="url(#moodifyGradient)"
        opacity="0.15"
      />

      <path
        d="M20 14v14.5a4.5 4.5 0 1 0 2 3.7V19l10-2v9.5a4.5 4.5 0 1 0 2 3.7V12l-14 2z"
        fill="url(#moodifyGradient)"
      />

      <path
        d="M8 30c4-4 8-4 12 0s8 4 12 0"
        stroke="url(#moodifyGradient)"
        stroke-width="2"
        stroke-linecap="round"
        opacity="0.8"
      />
    </svg>
  );
};

export default MoodifyIcon;
