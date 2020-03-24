const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please enter your name',
        min: 6,
        max: 255
    },
    email: {
        type: String,
      required: 'Please enter your email',
        min: 6,
        max: 255
    },
    password: {
        type: String,
      required:'Please enter your password',
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
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
module.exports=User=mongoose.model('User', userSchema);
