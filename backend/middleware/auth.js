const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{

    const {token} = req.cookies;

   if(!token){
    return next(new ErrorHander("Please Login to Access this Resources",401))
   }

   const decodedData = jwt.verify(token,process.env.JWT_SECRET);


   req.user = await User.findById(decodedData.id);

   next();

});


exports.authorizeRoles =(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(`Role: ${req.user.role} is not allowed this resources`, 403)
            );
        }
        next();
    };
    
};


