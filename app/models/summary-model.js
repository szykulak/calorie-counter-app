const mongoose = require('mongoose');

const summarySchema = mongoose.Schema({
    caloriesConsumed: Number,
    proteinConsumed: Number,
    carbsConsumed: Number,
    fatConsumed: Number,
    caloriesBurned: Number,
    totalEnergyBalance: Number

});
module.exports=mongoose.model('Summary', summarySchema);
