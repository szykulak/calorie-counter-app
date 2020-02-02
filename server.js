const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbConfig = require('./config/database-config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//połączenie z bazą danych
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Database connection failed', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "Welcome to Calorie Counter application!"});
});
require('./app/routes/exercise-route.js')(app);
require('./app/routes/food-route.js')(app);
require('./app/routes/user-route.js')(app);


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});