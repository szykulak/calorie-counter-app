const Food = require('../models/food-model.js');
const unirest = require('unirest');


exports.create = (req, res) => { //post
    var searchReq = unirest("GET", "https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data");
    searchReq.query({
        ingr: req.body.name
    });
    searchReq.headers({
        "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
        "x-rapidapi-key": "60a01974afmsh597ca1108d5a523p175d55jsn5c81f37d6c19" //todo wczytac z pliku?
    });

    searchReq.end(function (searchRes) {
        if (searchRes.error) throw new Error(searchRes.error);
        console.log(searchRes.body.calories)

        const food = new Food({
            name: req.body.name || "New meal",
            calories: searchRes.body.calories || "0",
            protein: searchRes.body.totalNutrients.PROCNT.quantity || "0",
            fat: searchRes.body.totalNutrients.FAT.quantity || "0",
            carbs: searchRes.body.totalNutrients.CHOCDF.quantity || "0"

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
    var searchReq = unirest("GET", "https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data");
    searchReq.query({
        ingr: req.body.name
    });
    searchReq.headers({
        "x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
        "x-rapidapi-key": "60a01974afmsh597ca1108d5a523p175d55jsn5c81f37d6c19" //todo wczytac z pliku?
    });

    searchReq.end(function (searchRes) {
        if (searchRes.error) throw new Error(searchRes.error);
        //console.log(searchRes.body.calories)

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
        return res.status(500).send({
            message: "Unknown error occurred while deleting food with id " + req.params.foodId
        });
    });

};
