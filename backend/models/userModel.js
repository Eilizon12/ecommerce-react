const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 Characters"],
        maxLength:[4,"Name should more than 4 Characters"]
    },

    email:{
        type:String,
        required:[true,"Please Enter Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid email"]
    },

    password:{
        type:String,
        required:[8,"password should be more than 8 "],
        select:false
    },

    avatar:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],

    role:{
        type:String,
        default:"user",

    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,


});

module.exports = mongoose.model("User",userSchema);