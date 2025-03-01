import { Student, StudentCourse, Course } from '../models/association.js';

export const getStudentCourses = async (req, res) => {
  console.log("getStudentCourses called for student:", req.user && req.user.id);

  try {
    // Checking to make sure that 'req.user' exists before using 'req.user.id'
    if (!req.user || !req.user.id) {
      console.log(' `req.user` is missing or invalid');
      return res.status(401).json({ message: 'Unauthorized. Please log in again' });
    }

    // Get the student's courses
    console.log('Fetching courses for student:', req.user.id);

    // Get the student ID from the JWT token
    const studentId = req.user.id;
    // Find all the course where the student is enrolled
    const enrolledCourses = await StudentCourse.findAll({
      where: { student_id: studentId },
      include: [{
        model: Course,
        as: 'course',
        attributes: ['course_id', 'course_name', 'description', 'professor', 'schedule']
      }]
    });

    // If no courses are found, return alert message
    if (enrolledCourses.length === 0) {
      console.log('No courses found for student:', studentId);
    }

    // Check if enrolledCourses is available
    console.log(`Rendering 'classes.ejs' for student ${studentId} with ${enrolledCourses.length} enrolled courses:`, { enrolledCourses });

    // Attempted to generate student initials
    // const studentInitials = req.student.first_name.charAt(0) + req.student.last_name.charAt(0);

    // Render the updated dashboard EJS page with the data
    return res.render('classes', {
      enrolledCourses: enrolledCourses.map(c => c.toJSON()) || [],
    });
  } catch (error) {
    console.error('Error fetching student courses:', error);
    return res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching all courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};
