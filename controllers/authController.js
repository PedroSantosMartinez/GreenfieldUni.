// The controller processes requests, validates data, and talks to the models.
import Student from '../models/student.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Load secret key for JWT authentication
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Registers new student and hashes password before saving 
/*Reasoning: 
Hashing before saving ensures the database never holds a plain-text password.
If something goes wrong, passwords are still safe.
Hashing after saving is a security risk because unprotected data exists for some time. */
export const registerStudent = async (req, res) => {
    try {
        console.log("Received request to register new student.");
        const { first_name, last_name, email, password } = req.body; // not sure what to do with the student_id and username 
        
        // Validate request
        if (!first_name || !last_name || !email || !password) {
            console.log("Bad request: Required fields are missing.");
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if student already exists
        console.log("Checking if student already exists...");
        const existingStudent = await Student.findOne({ where: {email }});
        console.log("Existing student:", existingStudent);

        if (existingStudent) { 
            console.log("Student already exists. Returning error response.");
            return res.status(400).json({ message: "Student already exists"}); 
        }

        // Hashes password before saving
        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);


        // Create new student 
        console.log("Creating new student record...");
        const newStudent = await Student.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        console.log("Student record created successfully.", newStudent);
        res.status(201).json({ message: "Student registered successfully", student: newStudent });

    } catch (error) {
        console.error("Error registering student:", error);
        console.log("Returning error response.");
        res.status(500).json({ message: "Error registering student", error: error.message });
    }
};

// Authenticates a student and issues a JWT token // Student Login
export const loginStudent = async (req, res) => {
    try {
        console.log("Login request received");
        console.log("Request body:", req.body);

        const { email, password } = req.body; // might replaces with username??? unless I find a way to get initals for first_name and then use last_name and random number after it to create a email???
        console.log("Extracted email and password:", email, password);

        // Find student by email
        const student = await Student.findOne({ where: { email } });
        console.log("Student found:", student);

        if (!student) {
            console.log("Student not found");
            return res.status(404).json({ message: "Invalid email or password / Student not found" });
}

        // Trim space and compare password
        const trimmedPassword = password.trim();
        console.log("Hashed password from database:", student.password); // Log the hashed password from the database
        console.log("Password being entered:", trimmedPassword); // Log the password being entered

        const isMatch = await bcrypt.compare(trimmedPassword, student.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(401).json({ message: "Invalid email or password" }); 
        }

        // Generate JWT token
        const token = jwt.sign({ id: student.student_id, email: student.email }, JWT_SECRET, { expiresIn: "1h" });
        console.log("Generated JWT token:", token);

        // Send token as HTTP-only cookie
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        console.log("Sent token as HTTP-only cookie");

        res.json({ message: "Login successful", token });
        console.log("Login successful response sent");

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// logs out students by clearing the authentication token
export const logoutStudent = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};
