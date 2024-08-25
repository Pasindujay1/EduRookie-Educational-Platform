import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    order: Number,
    type: { type: String, enum: ["video", "quiz", "note"] },
    note: String,
    video: String,
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    status: { type: String, enum: ["draft", "published", "deleted"] },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", ContentSchema);

export default Content;
