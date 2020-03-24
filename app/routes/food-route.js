module.exports = (app) => {
    const food = require('../controllers/food-controller.js');
    const auth = require('../controllers/auth-controller');

    app.post('/food', auth.verifyToken,food.create);

    app.get('/food',auth.verifyToken, food.findAll);

    app.put('/food/:foodId', auth.verifyToken,food.update);

    app.delete('/food/:foodId', auth.verifyToken,food.delete);


};