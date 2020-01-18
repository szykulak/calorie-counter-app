const Exercise = require('../models/exercise-model.js');

//post
exports.create = (req, res) => {
if(!req.body.name || !req.body.burnedCalories) {
        return res.status(400).send({
            message: "Invalid or empty request."
        });
    }
     const exercise = new Exercise({
            name: req.body.name || "New Exercise",
            burnedCalories: req.body.burnedCalories
            //todo tutaj robić wyszukiwanie? chyba trzeba to robić query stringiem
        });
    exercise.save() //jeśli request jest poprawny to zapisujemy dane do bazy
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
            message: err.message || "Unknown error occurred while creating Exercise."
        });
    });

};

//get
exports.findAll = (req, res) => {
 Exercise.find()
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
 if(!req.body.name || !req.body.burnedCalories) {
         return res.status(400).send({
             message: "Invalid or empty request."
         });
     }

     Exercise.findByIdAndUpdate(req.params.exerciseId, {
         name: req.body.name || "New Exercise",
         burnedCalories: req.body.burnedCalories
     }, {new: true}) //used to return the modified document to the then() function instead of the original.
     .then(exercise => {
         if(!exercise) {
             return res.status(404).send({
                 message: "Exercise with id " + req.params.exerciseId + " not found"
             });
         }
         res.send(exercise);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).send({
                 message: "Exercise with id " + req.params.exerciseId + " not found"
             });
         }
         return res.status(500).send({
             message: "Error updating exercise with id " + req.params.exerciseId
         });
     });
};

//delete
exports.delete = (req, res) => {
 Exercise.findByIdAndRemove(req.params.exerciseId)
    .then(exercise => {
        if(!exercise) {
            return res.status(404).send({
                message: "Exercise with id " + req.params.exerciseId + " not found"
            });
        }
        res.status(200).send({message: "Exercise deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message:  "Exercise with id " + req.params.exerciseId + " not found"
            });
        }
        return res.status(500).send({
            message: "Unknown error occurred while deleting exercise with id "+ req.params.exerciseId
        });
    });
};