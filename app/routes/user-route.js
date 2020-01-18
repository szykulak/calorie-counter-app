module.exports = (app) => {
    const user = require('../controllers/user-controller.js');
    const jwt = require('jsonwebtoken')
    require('dotenv').config()

    app.post('/user', user.create);

    app.get('/user', user.findAll);

    app.put('/user/:userId', user.update);

    app.delete('/user/:userId', user.delete);

    app.post('/user/login', (req, res) => { //wywalic to trzeba do kontrolera chyba
        const username = req.body.username
        const user = {name: username}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken})
    });

    function authenticateToken(req, res, next) { //validate the user //zwraca dane dla danego usera
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1] //bo między bearer a token jest spacja a my chcemy token czyli 2. el tablicy, jak nie ma headeru zwroc undefined
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
};