import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

// Schema
const ComicSchema = new mongoose.Schema({
  title: String,
  issue: Number,
  publisher: String,
});

const Comic = mongoose.model("Comic", ComicSchema);

// Routes
app.get("/comics", async (req, res) => {
  const comics = await Comic.find();
  res.json(comics);
});

app.post("/comics", async (req, res) => {
  const comic = new Comic(req.body);
  await comic.save();
  res.json(comic);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
