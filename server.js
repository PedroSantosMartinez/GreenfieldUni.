import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbconfig.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/mainRoutes.js';
import { registerStudent, loginStudent } from './controllers/authController.js';

const app = express();
app.use(express.json()); 

// Loads the environment variable from the env. file
dotenv.config();
const PORT = process.env.PORT || 3000;

// Sync model to the database
sequelize.sync()
    .then(() => console.log("✅ Database synced successfully!"))
    .catch(err => console.error("❌ Database sync error:", err));

// Setup __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templaing engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // ✅ Ensures Express looks in "views/"

// Use the central router 
app.use('/', router);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
