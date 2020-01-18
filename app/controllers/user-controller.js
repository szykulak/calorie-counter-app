const User = require('../models/user-model.js');
const jwt = require('jsonwebtoken');


exports.create = (req, res) => { //tworzenie użytkownika - post
    if (!req.body.username || !req.body.gender || !req.body.weight || !req.body.height || !req.body.age || !req.body.intake) {
        return res.status(400).send({
            message: "Incomplete or invalid data."
        });
    }
    const user = new User({
        username: req.body.username || "New User",
        gender: req.body.gender || "-",
        weight: req.body.weight || "-",
        height: req.body.height || "-",
        age: req.body.age || "-",
        intake: req.body.intake || "-"

    });
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while creating User."
        });
    });


};
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
    if (!req.body.gender || !req.body.weight || !req.body.height || !req.body.age || !req.body.intake) {
        return res.status(400).send({
            message: "Invalid or empty request."
        });
    }
    User.findByIdAndUpdate(req.params.userId, {
        username: req.body.username,
        gender: req.body.gender || "-",
        weight: req.body.weight || "-",
        height: req.body.height || "-",
        age: req.body.age || "-",
        intake: req.body.intake || "-"
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
        return res.status(500).send({
            message: "Unknown error occurred while deleting food with id " + req.params.userId
        });
    });

};


//czyli tu chyba jakas metodke calculate intake i wywolywac w pucie