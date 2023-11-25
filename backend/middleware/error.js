const ErrorHandler  = require("../utils/errorHander");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server ERROR";
    res.status(err.statusCode).json({
        success: false,
        error: err,
    });
};