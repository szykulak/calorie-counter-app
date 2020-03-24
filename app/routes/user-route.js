module.exports = (app) => {
    const user = require('../controllers/user-controller.js');
    const auth = require('../controllers/auth-controller');

    app.get('/user', auth.verifyToken, user.findAll);

    app.put('/user/:userId', auth.verifyToken, user.update);

    app.delete('/user/:userId', auth.verifyToken, user.delete);

};