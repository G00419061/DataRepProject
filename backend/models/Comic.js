import mongoose from "mongoose";

const ComicSchema = new mongoose.Schema({
  title: String,
  issue: Number,
  publisher: String,
  image: String
});

export default mongoose.model("Comic", ComicSchema, "comics");
