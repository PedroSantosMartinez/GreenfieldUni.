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
        const { first_name, last_name, dob, email, password, address, phone_num } = req.body; // not sure what to do with the student_id and username 

        // Check if student already exists
        const existingStudent = await Student.findone({ where: {email }});
        if (existingStudent) return res.status(400).json({ message: "Student already exists"});

        // Hashes password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student record
        await Student.create({
            first_name,
            last_name,
            dob,
            email,
            password: hashedPassword,
            address, 
            phone_num
        });

        res.status(201).json({ message: "Student registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error registering student", error: error.message });
    }
};

// Authenticates a student and issues a JWT token
export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body; // might replaces with username??? unless I find a way to get initals for first_name and then use last_name and random number after it to create a email???

        // Find student by email
        const student = await Student.findOne({ where: { email } });
        if (!student) return res.status(400).json({ message: "Invalid email or password" });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT token
        const token = jwt.sign({ id: student.id, email: student.email }, JWT_SECRET, { expiresIn: "1h" });

        // Send token as HTTP-only cookie
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// logs out students by clearing the authentication token
export const logoutStudent = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};