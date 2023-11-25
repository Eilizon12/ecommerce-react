const ErrorHandler = require("../utils/errorHander");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong MongoDB ID error
    if(err.name === "CastError"){
        const message = `Resource Not Found. INVALID: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    //Mongoose Duplicate
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    };

    // Wrong JWT error
    if(err.code === "JsonWebTokenError"){
        const message = `Json Web Token is Invalid!, Try Again!.`
        err = new ErrorHandler(message,400);
    };
    // JWT Expire
    if(err.code === "JsonWebExpiredError"){
        const message = `Json Web Token is EXPIRED!, Try Again!.`
        err = new ErrorHandler(message,400);
    };

    res.status(err.statusCode).json({
        success:false,
        error: err.message,
    });
};