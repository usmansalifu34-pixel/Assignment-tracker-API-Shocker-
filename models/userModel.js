const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {type:String, required:[true,"Enter your name"]},
    email: {type:String, required: [true,"Enter your email"], match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Enter a valid email"],unique:true},
    password: {type:String, required:[true,"Enter your password"]}
})
userSchema.pre('save',async function(){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
})
userSchema.methods.createJWT = function(next){
    return jwt.sign({name:this.name,email:this.email,userID:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
userSchema.methods.compareHash = async function(testPassword){
    const isMatch  =await bcryptjs.compare(testPassword,this.password)
    return isMatch
}
module.exports = mongoose.model("User",userSchema)
