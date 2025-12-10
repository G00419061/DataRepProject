import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditComic() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/comics/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error("Error loading comic:", err));
  }, [id]);

  if (!formData) {
    return <h2 className="text-center mt-5">Loading comic...</h2>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:4000/comics/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Comic updated!");
      navigate("/");
    } else {
      alert("Error updating comic.");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="container">
      <h1 className="text-center mb-4">Edit Comic</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={formData.title}
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
            value={formData.issue}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Publisher</label>
          <input
            name="publisher"
            className="form-control"
            value={formData.publisher}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            name="year"
            type="number"
            className="form-control"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max={currentYear}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quality Rating</label>
          <div style={{ fontSize: "1.8rem", cursor: "pointer" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                onClick={() => setFormData({ ...formData, quality: Number(i + 1) })}
                style={{ color: i < formData.quality ? "#ffc107" : "#e4e5e9" }}
              >
                ★
              </span>
            ))}
          </div>
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

        <div className="d-flex gap-2">
          <button className="btn btn-primary w-50" type="submit">
            Save Changes
          </button>

          <button
            type="button"
            className="btn btn-secondary w-50"
            onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>


      </form>
    </div>
  );
}
