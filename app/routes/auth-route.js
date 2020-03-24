module.exports = (app) => {

    const auth = require('../controllers/auth-controller.js');
    require("dotenv").config();

    app.post('/register', auth.create);
    app.post('/login', auth.login);


};