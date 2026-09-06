const mongoose = require('mongoose')
const assignmentSchema = new mongoose.Schema({
    title: {type:String, required:[true,"Assignment title expected"]},
    course: {type:String, required:[true,"course name expected"]},
    dueDate: {type:String, required:[true,"Assignment's due date expected"]},
    priority: {type:String,required:[true,"Priority level of assigment expected"],enum:["high","medium","low"]},
    status: {type:String,required:[true,"Status of assignment expected"], enum:['pending','complete','overdue']},
})
const model = mongoose.model('Assignment_tracker',assignmentSchema)
module.exports = model