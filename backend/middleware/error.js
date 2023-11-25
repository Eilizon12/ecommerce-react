const ErrorHandler = require("../utils/errorHander");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong MongoDB ID error
    if(err.name === "CastError"){
        const message = `Resource Not Found. INVALID: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        error: err.message,
    });
};