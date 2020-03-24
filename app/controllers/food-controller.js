const Food = require('../models/food-model.js');
const unirest = require('unirest');


exports.create = (req, res) => { //post
    if(!req.body.name){
        return res.status(400).send({
            message: "Request body cannot be empty!"
        });
    }
    var searchReq = unirest("GET", "https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data");
    searchReq.query({
        ingr: req.body.name
    });
    searchReq.headers({
        "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
        "x-rapidapi-key": process.env.EDAMAM_API_KEY
    });

    searchReq.end(function (searchRes) {
        if (searchRes.error) throw new Error(searchRes.error);
        const food = new Food({
            name: req.body.name,
            calories: searchRes.body.calories,
            protein: searchRes.body.totalNutrients.PROCNT.quantity,
            fat: searchRes.body.totalNutrients.FAT.quantity,
            carbs: searchRes.body.totalNutrients.CHOCDF.quantity

        });
        food.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error occurred while creating Food."
            });
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
    if(!req.body.name){
        return res.status(400).send({
            message: "Cannot PUT with empty request body!"
        });
    }
    var searchReq = unirest("GET", "https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data");
    searchReq.query({
        ingr: req.body.name
    });
    searchReq.headers({
        "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
        "x-rapidapi-key": process.env.EDAMAM_API_KEY
    });

    searchReq.end(function (searchRes) {
        if (searchRes.error) throw new Error(searchRes.error);
        Food.findByIdAndUpdate(req.params.foodId, {
            name: req.body.name,
            calories: searchRes.body.calories,
            protein: searchRes.body.totalNutrients.PROCNT.quantity,
            fat: searchRes.body.totalNutrients.FAT.quantity,
            carbs: searchRes.body.totalNutrients.CHOCDF.quantity,
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
        return res.status(403).send({
            message: "Cannot delete food" + req.params.foodId
        });
    });

};
