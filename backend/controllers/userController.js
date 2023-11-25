const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");



//Register User

exports.registerUser = catchAsyncError(async(req, res, next)=>{

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:
        {
            public_id:"This is sample Id",
            url:"profilepicID1"
        }
    });

    

    sendToken(user,201,res);

});


// Login User

exports.loginUser = catchAsyncError(async(req, res, next)=>{


    const {email,password} = req.body;

    if(!email || !password)
    {
        return next(new ErrorHander("Please Enter Email and Password",400));
    }

    const user = await User.findOne({ email }).select("+password");


    if(!user){
        return next(new ErrorHander("Invalid Email and Password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid Email and Password",401));
    }

  sendToken(user,200,res);
});