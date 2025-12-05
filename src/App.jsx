import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";   
import AddComic from "./components/AddComic";
import ComicList from "./components/ComicList";
import ComicQuiz from "./components/ComicQuiz";

function App() {
  return (
    <BrowserRouter>
      <Navbar />   

      <div className="container mt-4">
        <Routes>
          <Route path="/AddComic" element={<AddComic/>} />
          <Route path="/" element={<ComicList/>} />
          <Route path="/ComicQuiz" element={<ComicQuiz/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
