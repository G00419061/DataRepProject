import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: String,
});

export default mongoose.model("Questions", QuestionSchema, "question");