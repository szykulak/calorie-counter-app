const mongoose = require('mongoose');

const summarySchema = mongoose.Schema({

    caloriesConsumed: Number,
    proteinConsumed: Number,
    carbsConsumed: Number,
    fatConsumed: Number,
    caloriesBurned: Number,
    totalEnergyBalance: Number,
    date: {
        type: Date,
        default: Date.now
    }

});
module.exports=mongoose.model('Summary', summarySchema);
