import Course from '../models/courses.js';
import StudentCourse from '../models/student_courses.js';

const essentialCourses = ['ENG 101', 'SOC 101', 'MATH 101', 'BIO 101'];

export const checkEssentialCourses = async (req, res, next) => {
    try {
        const studentId = req.student.id;
        
        // Check enrollment for each essential course
        for (const courseName of essentialCourses) {
            const course = await Course.findOne({ where: { course_name: courseName } });
            
            if (!course) {
                console.log(`Essential course ${courseName} not found in database`);
                continue;
            }

            const existingEnrollment = await StudentCourse.findOne({
                where: {
                    student_id: studentId,
                    course_id: course.course_id
                }
            });

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