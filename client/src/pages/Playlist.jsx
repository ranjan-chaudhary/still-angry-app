import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Playlist() {
  const [songs, setSongs] = useState(() => {
    const savedSongs = localStorage.getItem("our-playlist");

    return savedSongs ? JSON.parse(savedSongs) : [];
  });

  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [songLink, setSongLink] = useState("");

  // Save songs whenever the playlist changes
  useEffect(() => {
    localStorage.setItem("our-playlist", JSON.stringify(songs));
  }, [songs]);

  const addSong = (e) => {
    e.preventDefault();

    if (!songName.trim()) return;

    const newSong = {
      id: Date.now(),
      name: songName.trim(),
      artist: artist.trim(),
      link: songLink.trim(),
    };

    setSongs((currentSongs) => [...currentSongs, newSong]);

    setSongName("");
    setArtist("");
    setSongLink("");
  };

  const removeSong = (id) => {
    setSongs((currentSongs) =>
      currentSongs.filter((song) => song.id !== id)
    );
  };

  return (
    <div className="playlist-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="playlist-container">
        <Link to="/" className="back-home">
          ← Back home
        </Link>

        <div className="playlist-header">
          <div className="playlist-icon">🎵</div>

          <p className="small-heading">A LITTLE PLAYLIST FOR YOU</p>

          <h1>Songs That Remind Me of You</h1>

          <p>Add the songs that hold a special meaning for you.</p>
        </div>

        <form className="add-song-form" onSubmit={addSong}>
          <h2>Add a Song ❤️</h2>

          <input
            type="text"
            placeholder="Song name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />

          <input
            type="url"
            placeholder="Spotify / YouTube link (optional)"
            value={songLink}
            onChange={(e) => setSongLink(e.target.value)}
          />

          <button type="submit">+ Add Song</button>
        </form>

        <div className="playlist-list">
          {songs.length === 0 ? (
            <div className="empty-playlist">
              <span>🎧</span>
              <p>No songs yet. Add your first song above ❤️</p>
            </div>
          ) : (
            songs.map((song, index) => (
              <div className="song-card" key={song.id}>
                <span className="song-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="song-info">
                  <h2>{song.name}</h2>
                  {song.artist && <p>{song.artist}</p>}
                </div>

                {song.link && (
                  <a
                    href={song.link}
                    target="_blank"
                    rel="noreferrer"
                    className="play-song"
                  >
                    ▶ Play
                  </a>
                )}

                <button
                  type="button"
                  className="delete-song"
                  onClick={() => removeSong(song.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <p className="playlist-footer">
          Every song has a little piece of you in it ❤️
        </p>
      </main>
    </div>
  );
}

export default Playlist;