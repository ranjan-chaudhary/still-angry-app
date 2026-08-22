import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TalkToMe() {
  const [message, setMessage] = useState(() => {
    return localStorage.getItem("talk-to-me-message") || "";
  });

  useEffect(() => {
    localStorage.setItem("talk-to-me-message", message);
  }, [message]);

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

          <textarea
            className="talk-editor"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me what's on your mind..."
            rows="10"
          />

          <p className="talk-saving">
            Your words are saved automatically ❤️
          </p>
        </div>
      </main>
    </div>
  );
}

export default TalkToMe;