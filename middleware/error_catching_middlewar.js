function errorHandler(err,req,res,next){
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong'
    if(err) return res.status(statusCode).json({message})
}

module.exports = errorHandler