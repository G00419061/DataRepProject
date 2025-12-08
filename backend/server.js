import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import Comic from "./models/Comic.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB (ComicStash DB)"))
  .catch(err => console.error("❌ MongoDB Error:", err));


app.get("/comics", async (req, res) => {
  const comics = await Comic.find();
  res.json(comics);
});


app.post("/comics", async (req, res) => {
  const newComic = new Comic(req.body);
  await newComic.save();
  res.json(newComic);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
