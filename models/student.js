import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
import bcrypt from "bcrypt";

const Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(100),
        defaultValue: 'temporary username',
        unique: true
      },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING(255),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
    },
    phone : {
        type: DataTypes.STRING(20),
    },
    enrollment_status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    }
    }, 
    {
    hooks: {
        // Hook that runs before saving a student record to the database
        beforeSave: async (student) => {
            // Extract the first letter of the first name and convert it to lowercase
            const first_initial = student.first_name[0].toLowerCase();
            // Convert the last name to lowercase
            const last_name = student.last_name.toLowerCase();
    
            // Use the provided student_id if available; otherwise, it's undefined at this point
            let student_id = student.student_id;
    
            // Generate a temporary username using the first initial and last name
            student.username = `${first_initial}${last_name}@student.gfu.edu`;
    
            // If a student_id is available, append it to the username
            if (student_id) {
                student.username = `${first_initial}${last_name}${student_id}@student.gfu.edu`;
            }
    
            // Hash the password if it's provided
            if (student.password) {
                // Generate a salt to add randomness to the hash
                const salt = await bcrypt.genSalt(10);
                // Hash the password with the generated salt
                student.password = await bcrypt.hash(student.password, salt);
            }
        },
    
        // Hook that runs after a student record is saved to the database
        afterSave: async (student) => {
            // Check if a student_id is now available and not already included in the username
            if (student.student_id && !student.username.includes(student.student_id)) {
                // Re-generate the username with the student_id included
                const first_initial = student.first_name[0].toLowerCase();
                const last_name = student.last_name.toLowerCase();
                student.username = `${first_initial}${last_name}${student.student_id}@student.gfu.edu`;
    
                // Update the student record in the database with the new username
                await student.update({ username: student.username });
            }
        }
    }
});

export default Student;