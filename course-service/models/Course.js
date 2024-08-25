import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    image: String,
    price: Number,
    stripeProductId: String,
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    status: { type: String, enum: ["draft", "published", "deleted"] },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
