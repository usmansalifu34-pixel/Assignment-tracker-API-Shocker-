const express = require('express')
const cors = require('cors')
const morgan = require('morgan')



const app = express()
app.use(express.json())
app.use(morgan('dev'))
require('dotenv').config()


const connectDB = require('./database/database')
const router = require('./routes/assignmentRouter')
const authMid = require('./middleware/authMid')
const authRouter = require('./routes/authRouter')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/error_catching_middleware')

app.use(cors())
app.use('/assignments/',authMid,router)
app.use('/auth',authRouter)


//throw ..
let port = process.env.PORT || 3000
const start = async ()=>{
    try{
         await connectDB(process.env.MONGODB_URI)
         console.log(`Database connected successfully`)
         app.listen(port,console.log(`Server is listening on port number ${port}`))
         app.use(errorHandler)
         app.use(notFound)
    }
   catch(error){
    console.log(error)
   }
}
start()