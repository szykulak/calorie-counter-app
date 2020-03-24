module.exports = (app) => {
    const summary = require('../controllers/summary-controller');
    const auth = require('../controllers/auth-controller');

    app.get('/summary', auth.verifyToken, summary.getSummary);

};