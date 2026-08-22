import { Link } from "react-router-dom";

function Home() {
  const sections = [
    {
      emoji: "💌",
      title: "Open When...",
      text: "A few words from me for the moments you need them.",
      path: "/open-when",
    },
    {
      emoji: "😡",
      title: "Still Angry?",
      text: "Tell me everything. I'm listening.",
      path: "/still-angry",
    },
    {
      emoji: "🫂",
      title: "Talk to Me",
      text: "Whatever you're feeling, you can tell me.",
      path: "/talk-to-me",
    },
    {
      emoji: "📸",
      title: "Our Memories",
      text: "Little moments that mean everything to me.",
      path: "/memories",
    },
    {
      emoji: "🎵",
      title: "Our Playlist",
      text: "Songs that will always remind me of you.",
      path: "/playlist",
    },
    {
      emoji: "📅",
      title: "Special Days",
      text: "Counting every moment that matters.",
      path: "/special-days",
    },
    {
      emoji: "🎁",
      title: "A Little Surprise",
      text: "There's something waiting for you here.",
      path: "/surprise",
    },
  ];

  return (
    <div className="home-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="home-container">
        <div className="home-hero">
          <div className="home-heart">❤️</div>

          <p className="small-heading">MADE ESPECIALLY FOR YOU</p>

          <h1>A Place For You</h1>

          <p>
            Whatever you're feeling, whatever's on your mind,
            <br />
            you can always come here.
          </p>
        </div>

        <div className="home-grid">
          {sections.map((section) => (
            <Link
              to={section.path}
              className="home-card"
              key={section.path}
            >
              <span className="home-card-emoji">{section.emoji}</span>

              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>

              <span className="home-arrow">→</span>
            </Link>
          ))}
        </div>

        <p className="home-footer">
          Made with ❤️ just for you.
        </p>
      </main>
    </div>
  );
}

export default Home;