import sequelize from '../config/dbconfig.js';
import Student from './student.js';
import Course from './courses.js';
import StudentCourse from './student_courses.js';

// Define many-to-many between Student and Course via StudentCourse
Student.belongsToMany(Course, {
  through: StudentCourse,
  foreignKey: 'student_id',
  otherKey: 'course_id',
  as: 'courses'
});

Course.belongsToMany(Student, {
  through: StudentCourse,
  foreignKey: 'course_id',
  otherKey: 'student_id',
  as: 'students'
});

// Define associations on the join table for eager-load easily
StudentCourse.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
StudentCourse.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

// Export the models for use in your controllers
export { sequelize, Student, Course, StudentCourse };
