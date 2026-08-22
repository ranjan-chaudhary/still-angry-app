import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Surprise() {
  const [surprise, setSurprise] = useState(() => {
    return (
      localStorage.getItem("little-surprise-message") ||
      ""
    );
  });

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "little-surprise-message",
      surprise
    );
  }, [surprise]);

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

          {!opened ? (
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
                onChange={(e) =>
                  setSurprise(e.target.value)
                }
                placeholder="Write your surprise message here..."
                rows="9"
              />

              <p className="surprise-saving">
                Your surprise is saved automatically ❤️
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Surprise;