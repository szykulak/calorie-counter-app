const Food = require('../models/food-model.js');

exports.create = (req, res) => { //post
    if (!req.body.name || !req.body.calories || !req.body.protein || !req.body.fat || !req.body.carbs) {
        return res.status(400).send({
            message: "Invalid or empty request."
        });
    }
    const food = new Food({
        name: req.body.name || "New meal",
        calories: req.body.calories,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs

    });
    food.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while creating Food."
        });
    });
};

exports.findAll = (req, res) => { //get
    Food.find()
        .then(food => {
            res.send(food);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while retrieving Food list."
        });
    });
};

exports.update = (req, res) => { //put
    if (!req.body.name || !req.body.calories || !req.body.protein || !req.body.fat || !req.body.carbs) {
        return res.status(400).send({
            message: "Invalid or empty request."
        });
    }
    Food.findByIdAndUpdate(req.params.foodId, {
        name: req.body.name || "New meal",
        calories: req.body.calories,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs
    }, {new: true})
        .then(food => {
            if (!food) {
                return res.status(404).send({
                    message: "Food with id " + req.params.foodId + " not found"
                });
            }
            res.send(food);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Food with id " + req.params.foodId + " not found"
            });
        }
        return res.status(500).send({
            message: "Error updating food with id " + req.params.foodId
        });
    });
};

exports.delete = (req, res) => {
    Food.findByIdAndRemove(req.params.foodId)
        .then(food => {
            if (!food) {
                return res.status(404).send({
                    message: "Food with id " + req.params.foodId + " not found"
                });
            }
            res.status(200).send({message: "Food deleted successfully!"});
        }).catch(err => {

        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Food with id " + req.params.foodId + " not found"
            });
        }
        return res.status(500).send({
            message: "Unknown error occurred while deleting food with id " + req.params.foodId
        });
    });

};
