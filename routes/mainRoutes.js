import express from 'express';
import { rootRouter } from './publicRoutes.js'; // Fixed import
import authRouter from './authRoutes.js';
import courseRouter from './courseRoutes.js';
import homeRouter from './homeRoutes.js';

const router = express.Router();

// Root Page (Handles `/`)
router.use('/', rootRouter);

// Authentication Routes (`/auth/register`, `/auth/login`, `/auth/logout`)
router.use('/', authRouter);

// Clase Routes
router.use('/', courseRouter);

// Dashboard Routes
router.use('/', homeRouter);

export default router;
