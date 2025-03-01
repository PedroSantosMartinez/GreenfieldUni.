import sequelize from './dbconfig.js';
import Course from '../models/courses.js';

const essentialCourses = [
    {
        course_name: 'ENG 101',
        description: 'Introduction to English Composition',
        credits: 3,
        professor: 'Dr. Smith',
        schedule: { days: ['Mon', 'Wed'], time: '10:00 AM' },
        fee: 450.00
    },
    {
        course_name: 'SOC 101',
        description: 'Introduction to Sociology',
        credits: 3,
        professor: 'Prof. Johnson',
        schedule: { days: ['Tue', 'Thu'], time: '2:00 PM' },
        fee: 450.00
    },
     {
    course_name: 'MATH 101',
    description: 'Introduction to Algebra',
    credits: 3,
    professor: 'Dr. Brown',
    schedule: { days: ['Mon', 'Wed', 'Fri'], time: '9:00 AM' },
    fee: 500.00
  },
  {
    course_name: 'BIO 101',
    description: 'Introduction to Biology',
    credits: 4,
    professor: 'Dr. Green',
    schedule: { days: ['Tue', 'Thu'], time: '1:00 PM' },
    fee: 550.00
  },
  {
    course_name: 'HIS 101',
    description: 'World History I',
    credits: 3,
    professor: 'Dr. Carter',
    schedule: { days: ['Mon', 'Wed'], time: '11:00 AM' },
    fee: 400.00
  },
    // Add other essential courses...
];

async function seedCourses() {
    try {
        await sequelize.sync({ force: false }); // Adjust options as needed
        
        for (const courseData of essentialCourses) {
            await Course.findOrCreate({
                where: { course_name: courseData.course_name },
                defaults: courseData
            });
        }
        
        console.log('Essential courses seeded successfully');
    } catch (error) {
        console.error('Error seeding courses:', error);
    }
}

export default seedCourses;