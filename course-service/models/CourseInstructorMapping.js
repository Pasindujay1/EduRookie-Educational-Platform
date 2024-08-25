import mongoose from "mongoose";

const CourseInstructorMappingSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  },
  {
    timestamps: true,
  }
);

const CourseInstructorMapping = mongoose.model(
  "CourseInstructorMapping",
  CourseInstructorMappingSchema
);

export default CourseInstructorMapping;
