import React from "react";
import useSong from "../hooks/useSong";
import "../styles/Playlist.scss";

const Playlist = () => {
  const { song, playlist, activeSongIndex, playSongAt, loading } = useSong();

  return (
    <aside className="playlist-panel">
      {/* Now Playing Card */}
      <div className="now-playing">
        {song ? (
          <>
            <div className="now-playing__art">
              {song.posterURL ? (
                <img src={song.posterURL} alt={song.title} />
              ) : (
                <span className="now-playing__art-fallback">♪</span>
              )}
              <div className="now-playing__art-overlay" />
            </div>
            <div className="now-playing__info">
              <p className="now-playing__label">Now playing</p>
              <p className="now-playing__title">{song.title}</p>
              <p className="now-playing__mood">{song.mood}</p>
            </div>
          </>
        ) : (
          <div className="now-playing__empty">
            <span className="now-playing__empty-icon">♪</span>
            <p>No song playing</p>
          </div>
        )}
      </div>

      {/* Playlist Header */}
      {playlist.length > 0 && (
        <div className="playlist-header">
          <span className="playlist-header__title">Recommended</span>
          {song?.mood && (
            <span className="playlist-header__badge">{song.mood}</span>
          )}
        </div>
      )}

      {/* Song List */}
      <div className="playlist-items">
        {loading && (
          <div className="playlist-loading">
            <span />
            <span />
            <span />
          </div>
        )}

        {!loading && playlist.length === 0 && (
          <p className="playlist-empty">
            Detect your mood to get recommendations
          </p>
        )}

        {!loading &&
          playlist.map((s, i) => (
            <div
              key={s._id ?? i}
              className={`song-row ${i === activeSongIndex ? "active" : ""}`}
              onClick={() => playSongAt(i)}
            >
              <span className="song-row__num">
                {i === activeSongIndex ? (
                  <span className="song-row__playing-indicator">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  i + 1
                )}
              </span>

              <div className="song-row__art">
                {s.posterURL ? (
                  <img src={s.posterURL} alt={s.title} />
                ) : (
                  <span>♪</span>
                )}
              </div>

              <div className="song-row__info">
                <p className="song-row__name">{s.title}</p>
                <p className="song-row__mood">{s.mood}</p>
              </div>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Playlist;
