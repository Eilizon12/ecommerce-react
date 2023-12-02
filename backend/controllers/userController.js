const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");




//Register User

exports.registerUser = catchAsyncError(async(req, res, next)=>{

   

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:
        {
            public_id: result.public._id,
            url:result.secure_url
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

//Logout User

exports.logout = catchAsyncError(async(req,res,next)=>{

res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
});

    res.status(200).json({
        success:true,
        message:"Log-out Succesfuly"
    });
});


//Forgot Password

exports.forgotPassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHander("User not Found",404));
    }

    //Get Reset Password
    const resetToken = user.getResetPasswordToken();
    

    await user.save({ validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is : -  \n\n ${resetPasswordUrl}\n\n if you have not requested this email then please ignore it.`;


    try{
        await sendEmail({
            email: user.email,
            subject:`Ecommerce-react password recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email send to ${user.email} succesfully`,

        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await  user.save({validateBeforeSave: false});
        return next(new ErrorHander(error.message,500));
    }

});

//Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Create token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHander('Reset Password Token is invalid!', 404));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new Error('Passwords do not match', 400));
  }

  // Update user password, clear reset token and expiry
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  // Send token with updated user information
  sendToken(user, 200, res);
});



// Get User Details
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{


    const user = await User.findById(req.user.id);


    res.status(201).json({
        success:true,
        user
    });

});

// Update User Password
exports.updatePassword = catchAsyncError(async(req,res,next)=>{


    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if(!isPasswordMatched){
        return next(new ErrorHander("OLD PASSWORD IS INCORECT",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("PASSWORD DOESN'T MATCH",400))
    }

    user.password = new req.body.newPassword;

    user.save();


   sendToken(user,200,res);

});


// Update User Profile - admin
exports.updateProfile = catchAsyncError(async(req,res,next)=>{

   const newUserData = {
    name:req.body.name,
    email:req.body.email,
   };

   //Cloudinary

   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new:true,
    runValidators:true,
    useFindAndModify:false
   });

   res.status(200).json({
    success:true,
   });

   

   sendToken(user,200,res);

});

// Update User Role - admin

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // Cloudinary - Assuming cloudinary operations are missing in this snippet

  user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Ensure user is updated before sending the response
  sendToken(user, 200, res);

  res.status(200).json({
    success: true,
  });
});

// Delete User - admin
exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    try {
        const userid = req.params.id; // Extract the product ID from the request parameters
    
        // Find the product by ID and delete it
        const user = await User.findOneAndDelete({ _id: userid });
    
        if(!user){
          return next(new ErrorHander("Product Not Found",404));
        }
  
    
        res.status(200).json({
          success: true,
          message: "Product has been deleted"
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message
        });
      }
 });




//Get all USER - ADMIN

exports.getAllUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.find();

    res.status(200).json({
        success:true,
        user,
    });
});
//Get Single USER - ADMIN

exports.getSingleUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander(`User Does not Exist: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user,
    });
});


