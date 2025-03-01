/** Middleware runs before the request reaches controllers. 
    It is used for tasks like authentication, logging, error handling, validation, and modifying requests. */
// Import jsonwebtoken
import jwt from "jsonwebtoken";
import Student from "../models/student.js";

// Load secret key for JWT authentication from environment variables (fallback to default for development)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
Middleware to authenticate students using JWT.
This function checks if a valid JWT token is present in the cookies.
If valid, the student's details are attached to the `req` object for further processing.
*/

const authenticateStudent = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;

        // If no token is found, deny access
        if (!token) {
            console.error("Token not found in the cookies");
            return res.status(401).json({ message: "Access Denied" });
        }

        // decode and verify the token using the JWT secret
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Log the decoded JWT payload
        console.log("Decoded JWT payload:", decoded);

        // Find student using student_id from token
        const student = await Student.findByPk(decoded.id, {
            attributes: ['student_id', 'first_name', 'last_name', 'email'] // Speciflly select fields
        });        

        if (!student) {
            console.error("User not found in the database");
            return res.status(401).json({ message: "Invalid token or user not found" });
        }
        
        // Attach the student details to the req user
        req.user = {
            id: student.student_id,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email
        };

        // Log the student details
        console.log("Student details attached to req.user:", req.user);

        // Proceed to the next middleware or route handler
        return next();
    } catch (error) {
        // If token verification fails (expired, tampered, or invalid), deny access
        console.error("JWT verfication errror:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authenticateStudent;
