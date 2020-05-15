const Summary = require('../models/summary-model');
const auth = require('../controllers/auth-controller');
const unirest = require('unirest');

exports.getSummary = (req, res) => {

    const foodArrayReq = unirest("GET", 'http://localhost:3000/food');
    //console.log(req.header('auth-token'));
    foodArrayReq.headers({
      "auth-token":  req.header('auth-token')
    });
    foodArrayReq.end(function (foodArrayRes) {
        if (foodArrayRes.error) throw new Error(foodArrayRes.error);
        const today = new Date().setHours(0,0,0,0);
        const foodArrayResFiltered = foodArrayRes.body.filter(obj => new Date(obj['date']).setHours(0,0,0,0) === today);
        let calorieSum = 0, proteinSum = 0, carbsSum = 0, fatSum = 0;
        let burnedCaloriesSum=0;
        for (var i = 0; i < foodArrayResFiltered.length; i++) {
            if (typeof foodArrayResFiltered[i].calories != "undefined" && typeof foodArrayRes.body[i].protein != "undefined"
                && typeof foodArrayResFiltered[i].carbs != "undefined" && typeof foodArrayRes.body[i].fat != "undefined") {

                calorieSum += foodArrayResFiltered[i].calories;
                proteinSum += foodArrayResFiltered[i].protein;
                carbsSum += foodArrayResFiltered[i].carbs;
                fatSum += foodArrayResFiltered[i].fat;
            }

        }
        const exerciseArrayReq = unirest("GET", 'http://localhost:3000/exercise')
        exerciseArrayReq.headers({
            "auth-token":  req.header('auth-token')
        });
        exerciseArrayReq.end(function (exerciseArrayRes) {
            if (exerciseArrayRes.error) throw new Error(exerciseArrayRes.error);
            const today = new Date().setHours(0,0,0,0);
            const exerciseArrayResFiltered = exerciseArrayRes.body.filter(obj => new Date(obj['date']).setHours(0,0,0,0) === today);
            for(var i =0;i<exerciseArrayResFiltered.length;i++){
                if (typeof exerciseArrayResFiltered[i].burnedCalories!="undefined"){
                    burnedCaloriesSum+=exerciseArrayResFiltered[i].burnedCalories;
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
