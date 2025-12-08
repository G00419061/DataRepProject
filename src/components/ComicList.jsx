import { useEffect, useState } from "react";

export default function ComicList() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/comics")
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

  return (
    <div className="container">
      <h1 className="text-center mb-4">My Collection</h1>

      <div className="row g-4">
        {comics.map((comic) => (
          <div key={comic._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm h-100">

              <div className="card-body">
                <h5 className="card-title">{comic.title}</h5>
                <p className="card-text">
                  <strong>Issue:</strong> {comic.issue} <br />
                  <strong>Publisher:</strong> {comic.publisher}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
