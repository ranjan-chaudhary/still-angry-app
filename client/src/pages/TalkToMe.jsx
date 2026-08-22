import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://still-angry-backend.onrender.com";

function TalkToMe() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  // Load message from MongoDB
  useEffect(() => {
    const loadMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/api/talk-to-me`);
        const data = await response.json();

        if (data.success) {
          setMessage(data.content || "");
        } else {
          setStatus("Could not load the message.");
        }
      } catch (error) {
        console.error("Error loading message:", error);
        setStatus("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, []);

  // Save message to MongoDB
  const saveMessage = async () => {
    setSaving(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/api/talk-to-me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Saved ❤️");
      } else {
        setStatus(data.message || "Could not save the message.");
      }
    } catch (error) {
      console.error("Error saving message:", error);
      setStatus("Could not connect to the server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="talk-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="talk-container">
        <Link to="/" className="back-home">
          ← Back home
        </Link>

        <div className="talk-card">
          <div className="talk-icon">🫂</div>

          <p className="small-heading">I'M ALWAYS HERE</p>

          <h1>Talk to Me</h1>

          <p className="talk-subtitle">
            Whatever is on your mind, you can write it here.
            <br />
            No judgment. Just you and your thoughts.
          </p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <textarea
                className="talk-editor"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me what's on your mind..."
                rows="10"
                disabled={saving}
              />

              <button
                type="button"
                onClick={saveMessage}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save ❤️"}
              </button>
            </>
          )}

          {status && <p className="talk-saving">{status}</p>}
        </div>
      </main>
    </div>
  );
}

export default TalkToMe;