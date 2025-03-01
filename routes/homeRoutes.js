import express from 'express';
import authenticateStudent from '../middleware/authMidware.js';

const homeRouter = express.Router();

// Dashboard Route
homeRouter.get('/student-home', authenticateStudent, (req, res) => {
    res.render('home'); // loads home.ejs as Student Home
});


export default homeRouter;