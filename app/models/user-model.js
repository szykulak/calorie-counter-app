const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    gender: String,
    weight: {
       type: Number,
        min: 0
    },
    height: {
        type: Number,
        min: 0
    },
    age: {
        type: Number,
        min: 0
    },
    intake: Number

});
module.exports=mongoose.model('User', userSchema);
