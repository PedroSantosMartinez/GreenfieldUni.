import express from 'express';
import { postRegisterStudent, postLoginStudent, postLogoutStudent } from './authRoutes.js';
import { loginPage } from './publicRoutes.js';

const router = express();

router.post('/', postRegisterStudent, postLoginStudent, postLogoutStudent);

router.use('/', loginPage);

export default router;