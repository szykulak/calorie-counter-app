module.exports = (app) => {
    const exercise = require('../controllers/exercise-controller.js');
    const auth = require('../controllers/auth-controller');

    app.post('/exercise', auth.verifyToken, exercise.create);

    app.get('/exercise', auth.verifyToken, exercise.findAll);

    app.put('/exercise/:exerciseId', auth.verifyToken, exercise.update);

    app.delete('/exercise/:exerciseId', auth.verifyToken, exercise.delete);
};