import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://still-angry-backend.onrender.com";

function Letter() {
  const { type } = useParams();

  const letterInfo = {
    sad: { emoji: "🌧️", title: "When you're sad" },
    "miss-me": { emoji: "🥺", title: "When you miss me" },
    angry: { emoji: "😡", title: "When you're angry" },
    "cant-sleep": { emoji: "🌙", title: "When you can't sleep" },
    alone: { emoji: "😔", title: "When you feel alone" },
    reminder: { emoji: "❤️", title: "A little reminder for you" },
  };

  const letter = letterInfo[type];

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!letter) return;

    const loadLetter = async () => {
      setLoading(true);
      setStatus("");

      try {
        const response = await fetch(
          `${API_URL}/api/letters/${type}`
        );

        const data = await response.json();

        if (data.success) {
          setMessage(data.content || "");
        }
      } catch (error) {
        console.error("Error loading letter:", error);
        setStatus("Could not load the letter.");
      } finally {
        setLoading(false);
      }
    };

    loadLetter();
  }, [type, letter]);

  const saveLetter = async () => {
    setSaving(true);
    setStatus("");

    try {
      const response = await fetch(
        `${API_URL}/api/letters/${type}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: message,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setStatus("Letter saved ❤️");
      } else {
        setStatus(data.message || "Could not save the letter.");
      }
    } catch (error) {
      console.error("Error saving letter:", error);
      setStatus("Could not connect to the server.");
    } finally {
      setSaving(false);
    }
  };

  if (!letter) {
    return (
      <div className="letter-page">
        <main className="letter-container">
          <h1>Letter not found</h1>

          <Link to="/open-when" className="back-home">
            ← Back to Open When
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="letter-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="letter-container">
        <Link to="/open-when" className="back-home">
          ← Back to Open When
        </Link>

        <div className="letter-card">
          <div className="letter-emoji">{letter.emoji}</div>

          <p className="small-heading">
            A LITTLE MESSAGE FROM ME
          </p>

          <h1>{letter.title}</h1>

          <div className="letter-divider">❤️</div>

          {loading ? (
            <p>Loading your letter...</p>
          ) : (
            <>
              <textarea
                className="letter-editor"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your personal message here..."
                rows="10"
              />

              <button
                type="button"
                onClick={saveLetter}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Letter ❤️"}
              </button>
            </>
          )}

          {status && <p className="letter-status">{status}</p>}

          <p className="letter-signature">
            Written especially for you ❤️
          </p>
        </div>
      </main>
    </div>
  );
}

export default Letter;