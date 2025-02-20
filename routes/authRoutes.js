import express from "express";
import { registerStudent, loginStudent, logoutStudent } from "../controllers/authController.js";
import authenticateStudent from "../middleware/authMidware.js";

const authRouter = express.Router();

// Student Registration
authRouter.post("/register", registerStudent);

// Student Login
authRouter.post("/login", loginStudent);

// Student Logout (requires authentication)
authRouter.post("/logout", authenticateStudent, logoutStudent);

export default authRouter;

