import mongoose from "mongoose";

const ComicSchema = new mongoose.Schema({
  title: String,
  issue: Number,
  publisher: String,
  image: String,
  year: Number,
  quality: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Comic", ComicSchema, "comics");
