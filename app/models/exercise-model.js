const mongoose = require('mongoose')

 const exerciseSchema = mongoose.Schema({

    name: String,
    burnedCalories: Number,
     date: {
         type: Date,
         default: Date.now
     }
});
 module.exports=mongoose.model('Exercise', exerciseSchema);
