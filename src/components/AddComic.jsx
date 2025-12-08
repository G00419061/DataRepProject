import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddComic() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    issue: "",
    publisher: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST to backend
    const res = await fetch("http://localhost:5000/comics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Comic added!");
      navigate("/"); 
    } else {
      alert("Error adding comic.");
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
            required
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

        <button className="btn btn-primary w-100" type="submit">
          Add Comic
        </button>

      </form>
    </div>
  );
}
