import { useState, createContext } from "react";

export const songContext = createContext();

export const SongProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Convenience getter — the currently active song object
  const song = playlist[activeSongIndex] ?? null;

  return (
    <songContext.Provider
      value={{
        song,
        loading,
        setLoading,
        setPlaylist,
        playlist,
        activeSongIndex,
        setActiveSongIndex,
      }}
    >
      {children}
    </songContext.Provider>
  );
};
