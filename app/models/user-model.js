const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    gender: String,
    weight: Number,
    height: Number,
    age: Number,
    intake: Number

});
module.exports=mongoose.model('User', userSchema);
