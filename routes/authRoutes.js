import express from "express";
import { registerStudent, loginStudent, logoutStudent } from "../controllers/authController.js";
import authenticateStudent from "../middleware/authMidware.js";

const postRegisterStudent = express.Router();
const postLoginStudent = express.Router();
const postLogoutStudent = express.Router();

// Student Registration
postRegisterStudent.post("/register", registerStudent);

// Student Login
postLoginStudent.post("/login", loginStudent);

// Student Logout (requires authentication)
postLogoutStudent.post("/logout", authenticateStudent, logoutStudent);

export { postRegisterStudent, postLoginStudent, postLogoutStudent };
