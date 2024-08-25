import express from 'express';
import {
  addNewEnrollment,
  cancelEnrollment,
  enrollInCourses,
  updateLearnedContent,
  isEnrolled,
} from '../controllers/Learner.js';

const router = express.Router();

router.post('/addNewEnrollment/:courseId', addNewEnrollment);
router.put('/cancelEnrollment/:courseId', cancelEnrollment);
router.post('/enroll-in-courses', enrollInCourses);
router.get('/isEnrolled/:userId/:courseId', isEnrolled);
router.put('/update-learned-content', updateLearnedContent);

export default router;
