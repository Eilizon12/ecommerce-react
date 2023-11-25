const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");


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

    res.status(201).json({
        success:true,
        user,
    });
});