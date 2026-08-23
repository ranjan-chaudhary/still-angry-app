import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://still-angry-backend.onrender.com";

function Surprise() {
  const [surprise, setSurprise] = useState("");
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  // Load surprise from MongoDB
  useEffect(() => {
    const loadSurprise = async () => {
      try {
        const response = await fetch(`${API_URL}/api/surprise`);
        const data = await response.json();

        if (data.success) {
          setSurprise(data.content || "");
        } else {
          setStatus(data.message || "Could not load the surprise.");
        }
      } catch (error) {
        console.error("Error loading surprise:", error);
        setStatus("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    loadSurprise();
  }, []);

  // Save surprise to MongoDB
  const saveSurprise = async () => {
    setSaving(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/api/surprise`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: surprise,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Surprise saved ❤️");
      } else {
        setStatus(data.message || "Could not save the surprise.");
      }
    } catch (error) {
      console.error("Error saving surprise:", error);
      setStatus("Could not connect to the server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="surprise-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="surprise-container">
        <Link to="/" className="back-home">
          ← Back home
        </Link>

        <div className="surprise-card">
          <div className="surprise-icon">
            {opened ? "❤️" : "🎁"}
          </div>

          <p className="small-heading">
            SOMETHING JUST FOR YOU
          </p>

          <h1>A Little Surprise</h1>

          {loading ? (
            <p>Loading your surprise...</p>
          ) : !opened ? (
            <>
              <p className="surprise-subtitle">
                There's something waiting for you...
              </p>

              <button
                className="open-surprise-button"
                onClick={() => setOpened(true)}
              >
                Open Your Surprise 🎁
              </button>
            </>
          ) : (
            <div className="surprise-content">
              <textarea
                className="surprise-editor"
                value={surprise}
                onChange={(e) => setSurprise(e.target.value)}
                placeholder="Write your surprise message here..."
                rows="9"
              />

              <button
                type="button"
                className="save-surprise-button"
                onClick={saveSurprise}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Surprise ❤️"}
              </button>
            </div>
          )}

          {status && (
            <p className="surprise-saving">{status}</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Surprise;