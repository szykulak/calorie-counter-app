module.exports = (app) => {
    const user = require('../controllers/user-controller.js');
    const jwt = require('jsonwebtoken')
    require('dotenv').config()

    app.post('/user', user.create);

    app.get('/user', user.findAll);

    app.put('/user/:userId', user.update);

    app.delete('/user/:userId', user.delete);

    app.post('/user/login', user.login);



};