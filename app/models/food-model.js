const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({

    name: String,
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports=mongoose.model('Food', foodSchema);
