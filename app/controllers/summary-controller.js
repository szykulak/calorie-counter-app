const Summary = require('../models/summary-model');
const unirest = require('unirest');

exports.getSummary = (req, res) => {

    const foodArrayReq = unirest("GET", 'http://localhost:3000/food');
    foodArrayReq.end(function (foodArrayRes) {
        if (foodArrayRes.error) throw new Error(foodArrayRes.error);
        let calorieSum = 0, proteinSum = 0, carbsSum = 0, fatSum = 0;
        let burnedCaloriesSum=0;
        for (var i = 0; i < foodArrayRes.body.length; i++) {
            if (typeof foodArrayRes.body[i].calories != "undefined" && typeof foodArrayRes.body[i].protein != "undefined" && typeof foodArrayRes.body[i].carbs != "undefined" && typeof foodArrayRes.body[i].fat != "undefined") {

                calorieSum += foodArrayRes.body[i].calories;
                proteinSum += foodArrayRes.body[i].protein;
                carbsSum += foodArrayRes.body[i].carbs;
                fatSum += foodArrayRes.body[i].fat;
            }

        }
        const exerciseArrayReq = unirest("GET", 'http://localhost:3000/exercise')
        exerciseArrayReq.end(function (exerciseArrayRes) {
            if (exerciseArrayRes.error) throw new Error(exerciseArrayRes.error);
            for(var i =0;i<exerciseArrayRes.body.length;i++){
                if (typeof exerciseArrayRes.body[i].burnedCalories!="undefined"){
                    burnedCaloriesSum+=exerciseArrayRes.body[i].burnedCalories;
                }
            }
            const summary = new Summary({
                caloriesConsumed: calorieSum,
                proteinConsumed: proteinSum,
                carbsConsumed: carbsSum,
                fatConsumed: fatSum,
                caloriesBurned: burnedCaloriesSum,
                totalEnergyBalance: calorieSum-burnedCaloriesSum
            });
            summary.save()
                .then(function () {
                    res.send(summary);
                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error occurred while creating summary."
                });
            });
        });

    });



};