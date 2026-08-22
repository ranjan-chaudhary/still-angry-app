import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://still-angry-backend.onrender.com";

function Playlist() {
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [songLink, setSongLink] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState("");

  // Load songs from MongoDB
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/songs`);
        const data = await response.json();

        if (data.success) {
          setSongs(data.songs || []);
        } else {
          setStatus(data.message || "Could not load songs.");
        }
      } catch (error) {
        console.error("Error loading songs:", error);
        setStatus("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  // Add song to MongoDB
  const addSong = async (e) => {
    e.preventDefault();

    if (!songName.trim()) return;

    setAdding(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/api/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: songName.trim(),
          artist: artist.trim(),
          link: songLink.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSongs((currentSongs) => [
          ...currentSongs,
          data.song,
        ]);

        setSongName("");
        setArtist("");
        setSongLink("");
        setStatus("Song added ❤️");
      } else {
        setStatus(data.message || "Could not add the song.");
      }
    } catch (error) {
      console.error("Error adding song:", error);
      setStatus("Could not connect to the server.");
    } finally {
      setAdding(false);
    }
  };

  // Delete song from MongoDB
  const removeSong = async (id) => {
    try {
      setStatus("");

      const response = await fetch(
        `${API_URL}/api/songs/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setSongs((currentSongs) =>
          currentSongs.filter((song) => song._id !== id)
        );

        setStatus("Song deleted.");
      } else {
        setStatus(data.message || "Could not delete the song.");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
      setStatus("Could not connect to the server.");
    }
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

          <p className="small-heading">
            A LITTLE PLAYLIST FOR YOU
          </p>

          <h1>Songs That Remind Me of You</h1>

          <p>
            Add the songs that hold a special meaning for you.
          </p>
        </div>

        <form className="add-song-form" onSubmit={addSong}>
          <h2>Add a Song ❤️</h2>

          <input
            type="text"
            placeholder="Song name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            disabled={adding}
          />

          <input
            type="text"
            placeholder="Artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            disabled={adding}
          />

          <input
            type="url"
            placeholder="Spotify / YouTube link (optional)"
            value={songLink}
            onChange={(e) => setSongLink(e.target.value)}
            disabled={adding}
          />

          <button type="submit" disabled={adding}>
            {adding ? "Adding..." : "+ Add Song"}
          </button>
        </form>

        {status && <p className="playlist-status">{status}</p>}

        <div className="playlist-list">
          {loading ? (
            <div className="empty-playlist">
              <span>🎧</span>
              <p>Loading playlist...</p>
            </div>
          ) : songs.length === 0 ? (
            <div className="empty-playlist">
              <span>🎧</span>
              <p>No songs yet. Add your first song above ❤️</p>
            </div>
          ) : (
            songs.map((song, index) => (
              <div className="song-card" key={song._id}>
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
                  onClick={() => removeSong(song._id)}
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