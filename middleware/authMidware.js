// Import jsonwebtoken
import jwt from "jsonwebtoken";

// Load secret key for JWT authentication from environment variables (fallback to default for development)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
Middleware to authenticate students using JWT.
This function checks if a valid JWT token is present in the cookies.
If valid, the student's details are attached to the `req` object for further processing.
*/

const authenticateStudent = (req, res, next) => {
    // Retrieve token from cookies
    const token = req.cookies.token;

    // If no token is found, deny access
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        // Verify the token using the JWT secret
        const verified = jwt.verify(token, JWT_SECRET);
        
        // Attach the decoded student data to the request object
        req.student = verified;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails (expired, tampered, or invalid), deny access
        res.status(401).json({ message: "Invalid token" });
    }
};

export default authenticateStudent;
