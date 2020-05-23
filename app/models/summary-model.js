const mongoose = require('mongoose');

const summarySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
