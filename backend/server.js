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
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo connection error:", err));

app.get("/comics", async (req, res) => {
  const comics = await Comic.find();
  res.json(comics);
});

app.post("/comics", async (req, res) => {
  const comic = new Comic(req.body);
  await comic.save();
  res.json(comic);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
