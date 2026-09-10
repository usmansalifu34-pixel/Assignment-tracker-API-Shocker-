const {StatusCodes} = require('http-status-codes')
function errorHandler(err,req,res,next){
    let customErr = {
    statusCode : err.statusCode || 500,
    message : err.message || 'Something went wrong'
    }
    if(err.name === 'CastError'){
        customErr.message = 'Invalid Assignment ID'
        customErr.statusCode = StatusCodes.BAD_REQUEST
    }
    if(err.name=== 'ValidationError'){
        customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
        customErr.statusCode  = StatusCodes.BAD_REQUEST
    }
    if(err.code===11000){
        const {keyValue} = err
        const duplicates = Object.keys(keyValue)
        customErr.message = `Duplicate values; ${duplicates} already exists in DB`
        customErr.statusCode = StatusCodes.BAD_REQUEST
    }
    //return res.status(customErr.statusCode).json(err)
    return res.status(customErr.statusCode).json({message: customErr.message})
}

module.exports = errorHandler