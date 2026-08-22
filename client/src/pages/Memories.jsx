import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://still-angry-backend.onrender.com";

function Memories() {
  const [memories, setMemories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState("");

  // Load memories from MongoDB
  useEffect(() => {
    const loadMemories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/memories`);
        const data = await response.json();

        if (data.success) {
          setMemories(data.memories || []);
        } else {
          setStatus(data.message || "Could not load memories.");
        }
      } catch (error) {
        console.error("Error loading memories:", error);
        setStatus("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    loadMemories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Add memory to MongoDB
  const addMemory = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setAdding(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/api/memories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          image,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMemories((currentMemories) => [
          ...currentMemories,
          data.memory,
        ]);

        setTitle("");
        setDescription("");
        setImage("");
        setStatus("Memory added ❤️");
      } else {
        setStatus(data.message || "Could not add the memory.");
      }
    } catch (error) {
      console.error("Error adding memory:", error);
      setStatus("Could not connect to the server.");
    } finally {
      setAdding(false);
    }
  };

  // Delete memory from MongoDB
  const removeMemory = async (id) => {
    try {
      setStatus("");

      const response = await fetch(
        `${API_URL}/api/memories/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMemories((currentMemories) =>
          currentMemories.filter(
            (memory) => memory._id !== id
          )
        );

        setStatus("Memory deleted.");
      } else {
        setStatus(data.message || "Could not delete the memory.");
      }
    } catch (error) {
      console.error("Error deleting memory:", error);
      setStatus("Could not connect to the server.");
    }
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
            disabled={adding}
          />

          <textarea
            placeholder="Write about this memory..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            disabled={adding}
          />

          <label className="photo-upload">
            📷 Choose a photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={adding}
            />
          </label>

          {image && (
            <div className="image-preview">
              <img src={image} alt="Preview" />

              <button
                type="button"
                onClick={() => setImage("")}
                disabled={adding}
              >
                × Remove photo
              </button>
            </div>
          )}

          <button type="submit" disabled={adding}>
            {adding ? "Adding..." : "+ Add Memory"}
          </button>
        </form>

        {status && (
          <p className="memories-status">{status}</p>
        )}

        <div className="memories-grid">
          {loading ? (
            <div className="empty-memories">
              <span>📷</span>
              <p>Loading memories...</p>
            </div>
          ) : memories.length === 0 ? (
            <div className="empty-memories">
              <span>📷</span>
              <p>Your memories will appear here ❤️</p>
            </div>
          ) : (
            memories.map((memory) => (
              <div className="memory-card" key={memory._id}>
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
                    onClick={() => removeMemory(memory._id)}
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