const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobile :{
        type : Number,
        required : true
    }
} , {versionKey : false} , {Timestamp : true})

const login = mongoose.model('users', loginSchema);

module.exports = login