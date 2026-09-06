const mongoose = require('mongoose')

const connectDB = async (url)=>{
    return mongoose.connect(url)
    .then(console.log("DATABASE CONNECTED SUCCESSFULLY"))
    .catch((error)=>{
        console.log(error)
    })
}
module.exports = connectDB