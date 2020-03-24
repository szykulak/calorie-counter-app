const User = require('../models/user-model.js');
const jwt = require('jsonwebtoken');

exports.findAll = (req, res) => { //get
    User.find()
        .then(user => {
            res.send(user);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while retrieving list of Users."
        });
    });
};
exports.update = (req, res) => { //put
    if (!req.body.gender || !req.body.weight || !req.body.height || !req.body.age) {
        return res.status(400).send({
            message: "Missing parameters, unable to calculate your calorie intake!"
        });
    }
    let calculateIntake = () => {
        if (req.body.gender === 'female') {
            return 665.09 + (9.56 * req.body.weight) + (1.85 * req.body.height) - (4.67 * req.body.age)
        } else if (req.body.gender === 'male') {
            return 66.47 + (13.75 * req.body.weight) + (5 * req.body.height) - (6.75 * req.body.age)
        } else {
            return res.status(406).send({
                message: "Invalid gender, please enter 'male' or 'female'."
            })
        }
    };
    User.findByIdAndUpdate(req.params.userId, { //tu juz zrobic tak zeby byly wszystkie parametry czyt wywalic blad

        //username: req.body.username,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        age: req.body.age,
        intake: calculateIntake()
    }, {new: true})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User with id " + req.params.userId + " not found"
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User with id " + req.params.userId + " not found"
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User with id " + req.params.userId + " not found"
                });
            }
            res.status(200).send({message: "User deleted successfully!"});
        }).catch(err => {

        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User with id " + req.params.userId + " not found"
            });
        }
        return res.status(403).send({
            message: "Cannot delete user. " + req.params.userId
        });
    });

};

