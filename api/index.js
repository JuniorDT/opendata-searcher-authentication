const Middlewares = require('../middlewares/index.js');

module.exports = function(app) {
    //** Connecting controllers **//
    const authControllers = require('./auth.js')(app);

    app
        .post('/registration', authControllers.registration)
        .post('/auth', Middlewares.verifyToken, authControllers.isAuth)
        .post('/login', authControllers.login)
};
