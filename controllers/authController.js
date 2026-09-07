const model = require('../models/userModel')
const {authError,customError,badRequest} = require('../errors')
const {StatusCodes} = require('http-status-codes')
const register = async (req,res)=>{
    const {name,email,password} = req.body
    
    const user = await model.create({name,email,password})
    
    const token = user.createJWT()
    //console.log(user)
    res.status(201).json({user:{name,email},token})
}
const login = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new badRequest('Expected a valid Email and password')
    }
    const user = await model.findOne({email})
    //console.log(user)
    if(!user){
        throw new authError('Invalid Credentials')
    }

    const isMatch = await user.compareHash(password)
    if(!isMatch){
        throw new authError('Invalid Credentials')
    }
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user:{name:user.name,email,userID:user._id},token})
}
module.exports = {register,login}