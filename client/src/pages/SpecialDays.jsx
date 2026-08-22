import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SpecialDays() {
  const [days, setDays] = useState(() => {
    const savedDays = localStorage.getItem("special-days");
    return savedDays ? JSON.parse(savedDays) : [];
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("special-days", JSON.stringify(days));
  }, [days]);

  const addDay = (e) => {
    e.preventDefault();

    if (!title.trim() || !date) return;

    const newDay = {
      id: Date.now(),
      title: title.trim(),
      date,
      message: message.trim(),
    };

    setDays((currentDays) => [...currentDays, newDay]);

    setTitle("");
    setDate("");
    setMessage("");
  };

  const removeDay = (id) => {
    setDays((currentDays) =>
      currentDays.filter((day) => day.id !== id)
    );
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
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <textarea
            placeholder="Write a little message for this day..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
          />

          <button type="submit">+ Add Special Day</button>
        </form>

        <div className="special-days-list">
          {days.length === 0 ? (
            <div className="empty-special-days">
              <span>🗓️</span>
              <p>No special days yet. Add your first one ❤️</p>
            </div>
          ) : (
            days.map((day) => (
              <div className="special-day-card" key={day.id}>
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
                  <p className="full-date">{formatDate(day.date)}</p>

                  {day.message && <p>{day.message}</p>}
                </div>

                <button
                  type="button"
                  className="delete-day"
                  onClick={() => removeDay(day.id)}
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