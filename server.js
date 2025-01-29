import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbconfig.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routes from './routes/authRoutes.js';
import { studentSignup, login } from './'

const app = express();
app.use(express.json()); 

// Loads the environment variable from the env. file
dotenv.config();
const PORT = process.env.PORT || 3000;

// Sync model to the database
sequelize.sync();

// Setup __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templaing engine
app.set('view engine', 'ejs');

// Student auth. routes
app.post('/studentSignup', studentSignup);
app.post('/login', login);



// Render 
app.use('/', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('') // blank log to make console out more readable
  });
