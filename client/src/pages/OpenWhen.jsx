import { Link } from "react-router-dom";

function OpenWhen() {
  const letters = [
    {
      emoji: "🌧️",
      title: "Open when you're sad",
      text: "A few words from me for the days when your heart feels heavy.",
      path: "/open-when/sad",
    },
    {
      emoji: "🥺",
      title: "Open when you miss me",
      text: "For those moments when you just wish I was beside you.",
      path: "/open-when/miss-me",
    },
    {
      emoji: "😡",
      title: "Open when you're angry",
      text: "Take a breath. Let me be here for you, even from far away.",
      path: "/open-when/angry",
    },
    {
      emoji: "🌙",
      title: "Open when you can't sleep",
      text: "Something to read during those quiet late-night hours.",
      path: "/open-when/cant-sleep",
    },
    {
      emoji: "😔",
      title: "Open when you feel alone",
      text: "A reminder that you are never as alone as you think.",
      path: "/open-when/alone",
    },
    {
      emoji: "❤️",
      title: "Open when you need a reminder",
      text: "In case you ever forget just how special you are to me.",
      path: "/open-when/reminder",
    },
  ];

  return (
    <div className="open-when-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="open-when-container">
        <Link to="/" className="back-home">
          ← Back home
        </Link>

        <div className="open-when-header">
          <div className="open-when-icon">💌</div>

          <p className="small-heading">SOME WORDS FROM MY HEART</p>

          <h1>Open When...</h1>

          <p>
            I can't always be there beside you,
            <br />
            but maybe these words can be.
          </p>
        </div>

        <div className="open-when-grid">
          {letters.map((letter) => (
            <Link
              to={letter.path}
              className="open-when-card"
              key={letter.path}
            >
              <span className="open-when-emoji">{letter.emoji}</span>

              <div className="open-when-content">
                <h2>{letter.title}</h2>
                <p>{letter.text}</p>
              </div>

              <span className="open-when-arrow">→</span>
            </Link>
          ))}
        </div>

        <p className="open-when-footer">
          Open them whenever you need me ❤️
        </p>
      </main>
    </div>
  );
}

export default OpenWhen;