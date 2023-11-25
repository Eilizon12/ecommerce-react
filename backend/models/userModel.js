const mongoose = require("mongoose");
const validator = require("validator");


const useSchema = new mongoose.Schema({

    name:
    {
    type:String,
    required:[true,"Please Enter your Name"],
    maxLength:[30,"Name Cannot exceed 30 characters"],
    minLength:[4,"Name should more than 5 characters"]
    },

    email:
    {
        type:String,
        required:[true,"Please enter your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter Valid Email"]
    },

    password:
    {
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be 8 characters"],
        select:false
    },

    avatar: 
    {
        
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        
    },
    role:
    {
        type:String,
        default:"User"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

module.exports = mongoose.model("User",userSchema);

