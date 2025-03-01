import Course from '../models/courses.js';
import Student from '../models/student.js';
import StudentCourse from '../models/student_courses.js';

const essentialCourses = ['ENG 101', 'SOC 101', 'MATH 101', 'BIO 101'];

export const checkEssentialCourses = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        console.log(studentId);
        
        // Check enrollment for each essential course
        for (const courseName of essentialCourses) {
        
            // Fetch all required courses
            const course = await Course.findOne({
                where: {
                    course_name: courseName
                }
            });

            // Check courses exists before continuing
            if (!course) {
                console.error(`Course not found: ${courseName} (Skipping) `);
                continue; // Skip to the next course
            }

            // Check if the student is already enrolled
            const existingEnrollment = await StudentCourse.findOne({
                where: {
                    student_id: studentId,
                    course_id: course.course_id
                }
            });

            // If not enrolled, enroll the student
            if (!existingEnrollment) {
                await StudentCourse.create({
                    student_id: studentId,
                    course_id: course.course_id,
                    enrollment_date: new Date(),
                    status: 'enrolled'
                });
                console.log(`Enrolled student ${studentId} in ${courseName}`);
            }
        }
        next();
    } catch (error) {
        console.error('Error in course enrollment middleware:', error);
        next(error);
    }
};

export default checkEssentialCourses;