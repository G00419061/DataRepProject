import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComicList() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");


  const getCreatedAtFromId = (comic) =>
    new Date(parseInt(comic._id.substring(0, 8), 16) * 1000);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comic from your collection?")) {
      return;
    }

    const res = await fetch(`http://localhost:4000/comics/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setComics(comics.filter((comic) => comic._id !== id));
    } else {
      alert("Failed to delete comic.");
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/comics")
      .then((res) => res.json())
      .then((data) => {
        setComics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching comics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading comics...</h2>;

  const sortedComics = [...comics].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return getCreatedAtFromId(b) - getCreatedAtFromId(a); 

      case "alphabetical":
        return a.title.localeCompare(b.title);

      case "rating":
        return (b.quality || 0) - (a.quality || 0);

      case "year":
        return  (a.year || 0) - (b.year || 0);

      default:
        return 0;
    }
  });


  const filteredComics = sortedComics.filter((comic) =>
    comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="text-center mb-4">My Collection</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">

        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select w-auto ms-3"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Latest Added</option>
          <option value="alphabetical">Alphabetical (A–Z)</option>
          <option value="rating">Highest Rated</option>
          <option value="year">Year Released</option>
        </select>
      </div>

      <div className="row g-4">
        {filteredComics.map((comic) => (
          <div key={comic._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm h-100">

              {comic.image && (
                <img
                  src={comic.image}
                  className="card-img-top"
                  alt={`${comic.title} cover`}
                  style={{
                    objectFit: "contain",
                    height: "250px",
                    backgroundColor: "#f8f9fa",
                    padding: "8px",
                  }}
                />
              )}

              <div className="card-body">
                <h5 className="card-title">{comic.title}</h5>

                <p className="card-text">
                  <strong>Issue:</strong> {comic.issue} <br />
                  <strong>Published Year:</strong> {comic.year} <br />
                  <strong>Publisher:</strong> {comic.publisher}
                </p>

                <div className="mt-2">
                  <strong>Quality: </strong>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      style={{
                        color: i < comic.quality ? "#ffc107" : "#e4e5e9",
                        fontSize: "1.4rem",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Edit/Delete Buttons */}
              <div className="card-footer bg-transparent border-0 d-flex gap-2">
                <button
                  className="btn btn-secondary w-50"
                  onClick={() => navigate(`/edit/${comic._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger w-50"
                  onClick={() => handleDelete(comic._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
