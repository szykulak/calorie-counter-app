module.exports = (app) => {
    const food = require('../controllers/food-controller.js');

    app.post('/food', food.create);

    app.get('/food', food.findAll);

    app.put('/food/:foodId', food.update);

    app.delete('/food/:foodId', food.delete);


};