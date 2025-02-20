import express from 'express';

const rootRouter = express.Router();

// Root Route (Homepage or Authentication Page)
rootRouter.get('/', (req, res) => {
    res.render('auth'); // This should exist in your views folder as `auth.ejs`
});

export { rootRouter };
