import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://still-angry-backend.onrender.com";

function SpecialDays() {
  const [days, setDays] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState("");

  // Load special days from MongoDB
  useEffect(() => {
    const loadDays = async () => {
      try {
        const response = await fetch(`${API_URL}/api/special-days`);
        const data = await response.json();

        if (data.success) {
          setDays(data.days || []);
        } else {
          setStatus(data.message || "Could not load special days.");
        }
      } catch (error) {
        console.error("Error loading special days:", error);
        setStatus("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    loadDays();
  }, []);

  // Add special day
  const addDay = async (e) => {
    e.preventDefault();

    if (!title.trim() || !date) return;

    setAdding(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/api/special-days`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          date,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setDays((currentDays) => [...currentDays, data.day]);

        setTitle("");
        setDate("");
        setMessage("");

        setStatus("Special day added ❤️");
      } else {
        setStatus(data.message || "Could not add the special day.");
      }
    } catch (error) {
      console.error("Error adding special day:", error);
      setStatus("Could not connect to the server.");
    } finally {
      setAdding(false);
    }
  };

  // Delete special day
  const removeDay = async (id) => {
    try {
      setStatus("");

      const response = await fetch(
        `${API_URL}/api/special-days/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setDays((currentDays) =>
          currentDays.filter((day) => day._id !== id)
        );

        setStatus("Special day deleted.");
      } else {
        setStatus(data.message || "Could not delete the special day.");
      }
    } catch (error) {
      console.error("Error deleting special day:", error);
      setStatus("Could not connect to the server.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <div className="special-days-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="special-days-container">
        <Link to="/" className="back-home">
          ← Back home
        </Link>

        <div className="special-days-header">
          <div className="special-days-icon">📅</div>

          <p className="small-heading">MOMENTS THAT MATTER</p>

          <h1>Special Days</h1>

          <p>Keep all your favourite dates in one little place.</p>
        </div>

        <form className="add-day-form" onSubmit={addDay}>
          <h2>Add a Special Day ❤️</h2>

          <input
            type="text"
            placeholder="What is this day? (Birthday, Anniversary...)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={adding}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={adding}
          />

          <textarea
            placeholder="Write a little message for this day..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            disabled={adding}
          />

          <button type="submit" disabled={adding}>
            {adding ? "Adding..." : "+ Add Special Day"}
          </button>
        </form>

        {status && (
          <p className="special-days-status">{status}</p>
        )}

        <div className="special-days-list">
          {loading ? (
            <div className="empty-special-days">
              <span>🗓️</span>
              <p>Loading special days...</p>
            </div>
          ) : days.length === 0 ? (
            <div className="empty-special-days">
              <span>🗓️</span>
              <p>No special days yet. Add your first one ❤️</p>
            </div>
          ) : (
            days.map((day) => (
              <div className="special-day-card" key={day._id}>
                <div className="special-day-date">
                  <span className="date-day">
                    {new Date(
                      `${day.date}T00:00:00`
                    ).getDate()}
                  </span>

                  <span className="date-month">
                    {new Date(
                      `${day.date}T00:00:00`
                    ).toLocaleDateString("en-IN", {
                      month: "short",
                    })}
                  </span>
                </div>

                <div className="special-day-content">
                  <h2>{day.title}</h2>

                  <p className="full-date">
                    {formatDate(day.date)}
                  </p>

                  {day.message && <p>{day.message}</p>}
                </div>

                <button
                  type="button"
                  className="delete-day"
                  onClick={() => removeDay(day._id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <p className="special-days-footer">
          Every important day deserves to be remembered ❤️
        </p>
      </main>
    </div>
  );
}

export default SpecialDays;