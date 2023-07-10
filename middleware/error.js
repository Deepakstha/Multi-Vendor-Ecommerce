const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    //Wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found with this id. Invalid ${err.path}`
        err = new ErrorHandler(message,400)
        console.log(message)
    }

    //Duplicate Key error
    if(err.code === 11000){
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400)
    }

    // wrong jwt error 
    if(err.name == "JsonWebTokenError"){
        const message = `Your url is invallid please try again later`
        err = new ErrorHandler(message, 400)
    }

    // Jwt expired
    if(err.name == "TokenExpiredError"){
        const message = `Token is Expired Please Try Again Later`
        err = new ErrorHandler(message, 400)

    }
    res.statusCode(err.statusCode).json({
        success:false,
        message:err.message
    })
}