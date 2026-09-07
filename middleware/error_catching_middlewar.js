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
    //console.log(err)
    return res.status(customErr.statusCode).json({message: customErr.message})
}

module.exports = errorHandler