const Exercise = require('../models/exercise-model.js');
const unirest = require('unirest');

//post
exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please enter activity name!"
        });
    }
    unirest.post('https://trackapi.nutritionix.com/v2/natural/exercise')
        .headers({
            "x-app-id": "85b47349",
            "x-app-key": process.env.NUTRITIONIX_API_KEY,
            "Content-Type": "application/json"
        })
        .send({
            query: req.body.name,
        })
        .then((searchRes) => {

            const exercise = new Exercise({
                userId: req.user._id,
                name: searchRes.body.exercises[0].name,
                burnedCalories: searchRes.body.exercises[0].nf_calories

            });
            exercise.save() //jeśli request jest poprawny to zapisujemy dane do bazy
                .then(data => {
                    res.send(data);
                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error occurred while creating Exercise."
                });
            });
        });


};

//get
exports.findAll = (req, res) => {
    Exercise.find({userId: req.user._id})
        .then(exercises => {
            res.send(exercises);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while retrieving Exercises."
        });
    });
};

//put
exports.update = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please enter activity name!"
        });
    }
    unirest.post('https://trackapi.nutritionix.com/v2/natural/exercise')
        .headers({
            "x-app-id": "85b47349",
            "x-app-key": process.env.NUTRITIONIX_API_KEY,
            "Content-Type": "application/json"
        })
        .send({
            query: req.body.name,
        }).then((searchRes) => {
        Exercise.findByIdAndUpdate(req.params.exerciseId, {
            name: searchRes.body.exercises[0].name,
            burnedCalories: searchRes.body.exercises[0].nf_calories
        }, {new: true}) //used to return the modified document to the then() function instead of the original.
            .then(exercise => {
                if (!exercise) {
                    return res.status(404).send({
                        message: "Exercise with id " + req.params.exerciseId + " not found"
                    });
                }
                res.send(exercise);
            }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Exercise with id " + req.params.exerciseId + " not found"
                });
            }
            return res.status(500).send({
                message: "Error updating exercise with id " + req.params.exerciseId
            });
        });
    });


};

//delete
exports.delete = (req, res) => {
    Exercise.findByIdAndRemove(req.params.exerciseId)
        .then(exercise => {
            if (!exercise) {
                return res.status(404).send({
                    message: "Exercise with id " + req.params.exerciseId + " not found"
                });
            }
            res.status(200).send({message: "Exercise deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Exercise with id " + req.params.exerciseId + " not found"
            });
        }
        return res.status(403).send({
            message: "Cannot delete exercise. " + req.params.exerciseId
        });
    });
};
