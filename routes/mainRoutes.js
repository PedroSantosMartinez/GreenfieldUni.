import express from 'express';
import { rootRouter } from './publicRoutes.js'; // Fixed import
import authRouter from './authRoutes.js';
import authenticateStudent from '../middleware/authMidware.js';
import { checkEssentialCourses } from '../middleware/courseMidware.js';
import { getStudentCourses, getAllCourses } from '../controllers/courseController.js';
import courseRouter from './courseRoutes.js';

const router = express.Router();

// Root Page (Handles `/`)
router.use('/', rootRouter);

// Authentication Routes (`/auth/register`, `/auth/login`, `/auth/logout`)
router.use('/', authRouter);

// Clase Routes
router.use('/', courseRouter);

export default router;
