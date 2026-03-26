import { getSongs } from "../services/song.api";
import { saveMood } from "../services/mood.api";
import { useContext } from "react";
import { songContext } from "../song.context";

const useSong = () => {
  const context = useContext(songContext);

  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }

  const {
    loading,
    setLoading,
    activeSongIndex,
    setActiveSongIndex,
    playlist,
    setPlaylist,
    song,
  } = context;

  async function getSongHandler({ mood }) {
    setLoading(true);
    try {
      const [data] = await Promise.all([
        getSongs({ mood }),
        saveMood(mood).catch((err) => console.error("Failed to save mood:", err)),
      ]);

      const songs = Array.isArray(data.data) ? data.data : [data.data];
      setPlaylist(songs);
      setActiveSongIndex(0); // backend now returns the song in the 'data' field
    } catch (error) {
      console.error("Failed to get song:", error);
    } finally {
      setLoading(false);
    }
  }

  function playNext() {
    if (activeSongIndex < playlist.length - 1) {
      setActiveSongIndex((prev) => prev + 1);
    }
  }

  function playPrev() {
    if (activeSongIndex > 0) {
      setActiveSongIndex((prev) => prev - 1);
    }
  }

  function playSongAt(index) {
    if (index >= 0 && index < playlist.length) {
      setActiveSongIndex(index);
    }
  }

  return {
    song,
    playlist,
    activeSongIndex,
    loading,
    getSongHandler,
    playNext,
    playPrev,
    playSongAt,
  };
};

export default useSong;
