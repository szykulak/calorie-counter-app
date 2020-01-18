const mongoose = require('mongoose')

 const exerciseSchema = mongoose.Schema({
    name: String,
    burnedCalories: Number
});
 module.exports=mongoose.model('Exercise', exerciseSchema);