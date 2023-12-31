const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

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


userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

//JWT TOKEN

userSchema.methods.getJWTToken = function()
{
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });

};

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


//Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function(){

    //Generate token

    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() +  15 * 60 * 1000;

    return resetToken;

};

module.exports = mongoose.model("User",userSchema);

