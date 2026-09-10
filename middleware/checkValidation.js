const {validationResult} = require('express-validator')
const {badRequest} = require('../errors')
const checkValidation = (req,res,next)=>{
    const result = validationResult(req)
    //const result = validationResult(req)
    if(!result.isEmpty()){
        throw new badRequest('Please fill all fields')
    }
    next()
}
module.exports = checkValidation