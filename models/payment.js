import Course from './courses.js';

const Payment = sequelize.define('Payments', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: sequelize.models.Student, // Reference to the Student model to prevent import issues and circular dependency
            key: 'student_id'
        }
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course, // Reference to the Course model
            key: 'course_id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2), // Decimal column with precision of 10 and 2 decimal places
        allowNull: false,
        defaultValue: 0.00
    },
    paid_at: {
        type: DataTypes.DATE, // Records the timestamp when payment is made
    },
    status: {
        type: DataTypes.ENUM('paid', 'pending'), // Payment status can only be 'paid' or 'pending'
        allowNull: false,
        defaultValue: 'pending' // Default value is 'pending'
    },
}, {
    hooks: {
        beforeUpdate: (payment) => {
            // Automatically set 'paid_at' when status is updated to 'paid'
            if (payment.status === 'paid' && !payment.paid_at) {
                payment.paid_at = new Date();
            }
        },
    },
});
