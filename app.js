const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const connectDB = require('./database/database')
const router = require('./routes/assignmentRouter')
const authMid = require('./middleware/authMid')
const authRouter = require('./routes/authRouter')
const errorHandler = require('./middleware/error_catching_middlewar')
app.use('/assignments/',authMid,router)
app.use('/auth',authRouter)
app.use(errorHandler)
//throw ..
let port = process.env.PORT || 3000
const start = async ()=>{
    try{
         await connectDB(process.env.MONGODB_URI)
         console.log(`Database connected successfully`)
         app.listen(port,console.log(`Server is listening on port number ${port}`))
    }
   catch(error){
    console.log(error)
   }
}
start()