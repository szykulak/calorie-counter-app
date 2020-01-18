module.exports = (app) => {
    const exercise = require('../controllers/exercise-controller.js');


    app.post('/exercise', exercise.create);

    app.get('/exercise', exercise.findAll);

    app.put('/exercise/:exerciseId', exercise.update);

    app.delete('/exercise/:exerciseId', exercise.delete);
};