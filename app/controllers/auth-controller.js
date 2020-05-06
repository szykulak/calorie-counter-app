const User = require('../models/user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//validation
// const Joi = require('@hapi/joi');
// const schema = {
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required.email(),
//     password:  Joi.string().min(6).required()
//
// }
exports.create = async (req, res) => { //register new user
    //validate
    // const validation = Joi.validate(req.body, schema);
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already exists in the database');
    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    // res.send(validation);
    user.save()
        .then(data => {
            res.send(data._id);
        }).catch(err => {
        res.status(400).send({
            message: err.message || "Unknown error occurred while creating User." //fix
        });
    });

};

exports.login = async (req, res) => {

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email does not exist')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');
try{
    const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET);
    const jsonToken={token:token}
    console.log(jsonToken);
    res.header('auth-token', jsonToken).send(jsonToken);
}catch(err){
    console.log(err);
}

};

exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('You are not permitted to perform this action');
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }

};
