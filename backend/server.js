import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import Comic from "./models/Comic.js";
import Questions from "./models/Questions.js"

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB (ComicStash DB)"))
  .catch(err => console.error("MongoDB Error:", err));


app.get("/comics", async (req, res) => {
  const comics = await Comic.find();
  res.json(comics);
});


app.post("/comics", async (req, res) => {
  try {
    const newComic = new Comic(req.body);
    await newComic.save();
    res.json(newComic);
  } catch (err) {
    console.error("Error saving comic:", err);
    res.status(400).json({ error: "Failed to save comic" });
  }
});

app.delete("/comics/:id", async (req, res) => {
  try {
    await Comic.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting comic:".err);
    res.status(400).json({ error: "Failed to delete comic" })
  }
});

app.get("/comics/:id", async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);
    res.json(comic);
  } catch (err) {
    res.status(400).json({ error: "Comic not found" });
  }
});


app.put("/comics/:id", async (req, res) => {
  try {
    const updatedComic = await Comic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedComic);
  } catch (err) {
    res.status(400).json({ error: "Error updating comic" });
  }
});

app.get("/quiz", async (req, res) => {
  try{
    const randomQuestions = await Questions.aggregate([{$sample: {size:10}}]);
    res.json(randomQuestions);
  }catch(err){
    res.status(500).json({error: "Failed to load quiz questions"});
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
