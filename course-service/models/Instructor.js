import mongoose from "mongoose";

const InstructorSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    age: Number,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Instructor = mongoose.model("Instructor", InstructorSchema);

export default Instructor;
