import { StudentCourse, Course } from '../models/association.js';

export const getStudentCourses = async (req, res) => {
  console.log("getStudentCourses called for student:", req.student && req.student.id);

  try {
    const studentId = req.student.id;
    const enrolledCourses = await StudentCourse.findAll({
      where: { student_id: studentId },
      include: [{
        model: Course,
        as: 'course',
        attributes: ['course_name', 'description', 'professor', 'schedule']
      }]
    });

    const studentInitials = (req.student.first_name && req.student.last_name)
      ? req.student.first_name[0] + req.student.last_name[0]
      : '';

    // Render the updated dashboard EJS page with the data
    return res.render('dashboard', {
      enrolledCourses: enrolledCourses.map(c => c.toJSON()),
      studentInitials
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
