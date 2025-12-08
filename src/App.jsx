import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";   
import AddComic from "./components/AddComic";
import ComicList from "./components/ComicList";
import ComicQuiz from "./components/ComicQuiz";
import EditComic from "./components/EditComic";

function App() {
  return (
    <BrowserRouter>
      <Navbar />   

      <div className="container mt-4">
        <Routes>
          <Route path="/AddComic" element={<AddComic/>} />
          <Route path="/" element={<ComicList/>} />
          <Route path="/ComicQuiz" element={<ComicQuiz/>} />
          <Route path="edit/:id" element={<EditComic />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
