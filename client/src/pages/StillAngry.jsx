import { useState } from "react";

function StillAngry() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("Please tell me what's bothering you first 🥺");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://still-angry-backend.onrender.com/api/angry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("");
        setStatus("Your feelings have reached me ❤️");
      } else {
        setStatus(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="still-angry-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="angry-card">
        <div className="emoji-container">
          <span className="angry-emoji">😡</span>
        </div>

        <p className="small-heading">A SAFE PLACE FOR YOUR FEELINGS</p>

        <h1>Still Angry?</h1>

        <p className="subtitle">
          Tell me everything. No judgment, no interruptions.
          <br />
          I'm listening.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I'm still angry because..."
            rows="7"
            disabled={loading}
          />

          <div className="form-bottom">
            <span>{message.length} characters</span>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send My Feelings ❤️"}
            </button>
          </div>
        </form>

        {status && (
          <p
            className={
              status.includes("reached")
                ? "status-message success"
                : "status-message error"
            }
          >
            {status}
          </p>
        )}

        <p className="bottom-text">
          Your words are safe here.
        </p>
      </main>
    </div>
  );
}

export default StillAngry;