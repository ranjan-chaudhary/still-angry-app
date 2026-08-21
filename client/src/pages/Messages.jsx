import { useEffect, useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/angry");

        const data = await response.json();

        if (data.success) {
          setMessages(data.messages);
        } else {
          setError(data.message || "Could not load messages.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  return (
    <div className="messages-page">
      <div className="messages-glow messages-glow-one"></div>
      <div className="messages-glow messages-glow-two"></div>

      <main className="messages-container">
        <div className="messages-header">
          <div className="heart-icon">❤️</div>

          <p className="small-heading">PRIVATE LITTLE CORNER</p>

          <h1>Her Messages</h1>

          <p>
            Everything she wanted to say, safely kept here.
          </p>
        </div>

        {loading && (
          <div className="messages-state">
            <span className="loading-heart">❤️</span>
            <p>Loading her messages...</p>
          </div>
        )}

        {error && !loading && (
          <div className="messages-error">
            {error}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="empty-messages">
            <div>💌</div>
            <h2>No messages yet</h2>
            <p>Her first message will appear here.</p>
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="messages-list">
            {messages.map((item) => (
              <article className="message-card" key={item._id}>
                <div className="message-top">
                  <span className="message-label">HER FEELINGS</span>

                  <time>
                    {new Date(item.createdAt).toLocaleString()}
                  </time>
                </div>

                <p className="message-text">{item.message}</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Messages;