const mongoose = require('mongoose')

 const exerciseSchema = mongoose.Schema({
     userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     },
    name: String,
    burnedCalories: Number,
     date: {
         type: Date,
         default: Date.now
     }
});
 module.exports=mongoose.model('Exercise', exerciseSchema);
