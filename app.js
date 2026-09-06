const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const connectDB = require('./database/database')
const router = require('./routes/router')
const errorHandler = require('./middleware/error_catching_middlewar')
app.use('/assignments/',router)
app.use(errorHandler)
//throw ..
let port = process.env.PORT || 5000
const start = async ()=>{
    try{
         await connectDB(process.env.MONGODB_URI)
         .then(app.listen(port,console.log(`Server is listening on port number ${port}`)))
    }
   catch(error){
    console.log(error)
   }
}
start()