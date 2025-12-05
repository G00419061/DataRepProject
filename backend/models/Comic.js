import mongoose from "mongoose";

const ComicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issue: { type: Number, required: true },
  publisher: String
});

export default mongoose.model("Comic", ComicSchema, "ComicStash");
