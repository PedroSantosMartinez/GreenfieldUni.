import express from 'express';

const loginPage = express.Router();

loginPage.use('/', (req, res) => {
    res.render('auth');
});

export { loginPage };