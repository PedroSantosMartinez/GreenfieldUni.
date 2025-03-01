import express from 'express';
import authenticateStudent from '../middleware/authMidware.js';
import { getStudentCourses } from '../controllers/courseController.js';
import checkEssentialCourses from '../middleware/courseMidware.js';

const courseRouter = express.Router();

// Enrolled courses display   controller 1        controller 2
courseRouter.get('/classes', authenticateStudent, getStudentCourses, checkEssentialCourses);


export default courseRouter;