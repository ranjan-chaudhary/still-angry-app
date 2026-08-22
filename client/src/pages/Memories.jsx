import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Memories() {
  const [memories, setMemories] = useState(() => {
    const savedMemories = localStorage.getItem("our-memories");
    return savedMemories ? JSON.parse(savedMemories) : [];
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    localStorage.setItem("our-memories", JSON.stringify(memories));
  }, [memories]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const addMemory = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newMemory = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      image,
    };

    setMemories((currentMemories) => [
      ...currentMemories,
      newMemory,
    ]);

    setTitle("");
    setDescription("");
    setImage("");
  };

  const removeMemory = (id) => {
    setMemories((currentMemories) =>
      currentMemories.filter((memory) => memory.id !== id)
    );
  };

  return (
    <div className="memories-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="memories-container">
        <Link to="/" className="back-home">
          ← Back home
        </Link>

        <div className="memories-header">
          <div className="memories-icon">📸</div>

          <p className="small-heading">OUR LITTLE MOMENTS</p>

          <h1>Our Memories</h1>

          <p>Add the moments you never want to forget.</p>
        </div>

        <form className="add-memory-form" onSubmit={addMemory}>
          <h2>Add a Memory ❤️</h2>

          <input
            type="text"
            placeholder="Memory title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write about this memory..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />

          <label className="photo-upload">
            📷 Choose a photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {image && (
            <div className="image-preview">
              <img src={image} alt="Preview" />
              <button type="button" onClick={() => setImage("")}>
                × Remove photo
              </button>
            </div>
          )}

          <button type="submit">+ Add Memory</button>
        </form>

        <div className="memories-grid">
          {memories.length === 0 ? (
            <div className="empty-memories">
              <span>📷</span>
              <p>Your memories will appear here ❤️</p>
            </div>
          ) : (
            memories.map((memory) => (
              <div className="memory-card" key={memory.id}>
                {memory.image && (
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="memory-image"
                  />
                )}

                <div className="memory-content">
                  <h2>{memory.title}</h2>

                  {memory.description && (
                    <p>{memory.description}</p>
                  )}

                  <button
                    type="button"
                    className="delete-memory"
                    onClick={() => removeMemory(memory.id)}
                  >
                    × Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <p className="memories-footer">
          Some moments deserve to stay forever ❤️
        </p>
      </main>
    </div>
  );
}

export default Memories;