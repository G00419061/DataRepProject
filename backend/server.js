import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import Comic from "./models/Comic.js";

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

app.delete("/comics/:id", async (req, res) =>{
  try{
    await Comic.findByIdAndDelete(req.params.id);
    res.json({success: true});
  }catch (err){
    console.error("Error deleting comic:". err);
    res.status(400).json({error: "Failed to delete comic"})
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
