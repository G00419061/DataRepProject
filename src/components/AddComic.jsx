import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddComic() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    issue: "",
    publisher: "",
    year: "",
    image: "",
    quality: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const currentYear = new Date().getFullYear();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/comics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Comic added!");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Add a New Comic</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Issue</label>
          <input
            name="issue"
            type="number"
            className="form-control"
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Publisher</label>
          <input
            name="publisher"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Published Year</label>
          <input
            name="year"
            type="number"
            className="form-control"
            onChange={handleChange}
            min="1900"
            max={currentYear}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quality Rating</label>
          <div className="star-rating" style={{ fontSize: "1.8rem", cursor: "pointer" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                onClick={() => setFormData({ ...formData, quality: i + 1 })}
                style={{ color: i < formData.quality ? "#ffc107" : "#e4e5e9" }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="img-fluid mb-3"
            style={{
              maxHeight: "250px",
              objectFit: "contain",
              width: "100%",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              padding: "8px",
              display: "block",
              margin: "0 auto"
            }}
          />

        )}

        <button className="btn btn-primary w-100" type="submit">
          Add Comic
        </button>
      </form>
    </div>
  );
}
