module.exports = (app) => {
    const summary = require('../controllers/summary-controller');

    app.get('/summary', summary.getSummary);

};