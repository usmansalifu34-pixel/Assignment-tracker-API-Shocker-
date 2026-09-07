const {authError} = require('../errors')
const jwt = require('jsonwebtoken')
const authMid = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader|| !authHeader.startsWith('Bearer ')){
        throw new authError('Invalid token')
    }
    const token = authHeader.split(' ')[1]
    try{
         const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {
            email:payload.email,
            name:payload.name,
            userID:payload.userID
        }
        return next()
    
    }
   catch(err){
    throw new authError('Invalid token')
   }
    
}
module.exports = authMid