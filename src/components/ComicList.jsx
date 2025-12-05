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
      <h1 className="text-center mb-4">Comic List</h1>

      {comics.length === 0 ? (
        <p className="text-center">No comics found.</p>
      ) : (
        <div className="list-group">
          {comics.map((comic) => (
            <div key={comic._id} className="list-group-item">
              <h5>{comic.title}</h5>
              <p>Issue: {comic.issue}</p>
              <p>Publisher: {comic.publisher}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
