import express from 'express';
import authenticateStudent from '../middleware/authMidware.js';
import { checkEssentialCourses } from '../middleware/courseMidware.js';
import { getStudentCourses, getAllCourses } from '../controllers/courseController.js';

const courseRouter = express.Router();

// Middleware to protect all course routes
courseRouter.use(authenticateStudent, checkEssentialCourses);

// Enrolled courses display
courseRouter.get('/classes', getStudentCourses);

// All courses display
courseRouter.get('/all-courses', getAllCourses);

export default courseRouter;