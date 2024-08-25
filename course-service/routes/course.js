import express from "express";
import {
  addContent,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  getCourseWithCompany,
  getCourseById,
  getCourseNameAndId,
  getCourseByUserId,
  fetchAllDraftCourses,
  updateCourseStatus,
  searchCourse,
} from "../controllers/course.js";
import upload from "../middlewares/multer.js";
// import { fetchUser } from "../utils/fetchUser.js";

const router = express.Router();

router.post("/createCourse", createCourse);
router.put("/updateCourse", upload.single("image"), updateCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.get("/getCourse/:id", getCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/addContent", upload.single("video"), addContent);
router.get("/getCourseWithCompany/:id", getCourseWithCompany);
router.get("/getCourseById/:id", getCourseById);
router.get("/getCourseNameAndId", getCourseNameAndId);
router.get("/getCourseByUserId", getCourseByUserId);
router.get("/fetchAllDraftCourses", fetchAllDraftCourses);
router.put("/updateCourseStatus", updateCourseStatus);
router.get("/search/:title", searchCourse);

// router.get("/test", fetchUser, (req, res) => {
//   res.status(200).json({ user: req.user });
// });

export default router;
