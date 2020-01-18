const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    //TODO jakieś username albo coś???
    gender: String,
    weight: Number,
    height: Number,
    age: Number,
    intake: Number

});
module.exports=mongoose.model('User', userSchema);
