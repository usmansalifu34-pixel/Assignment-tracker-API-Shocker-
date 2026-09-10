const model = require('../models/assignments')
const {customError,badRequest,notFound} = require('../errors')
const { StatusCodes } = require('http-status-codes')
const delimiter = (string)=>{
    string = string.split(',').map((element)=>{return element.trim()}).join(' ')
    return string
}
const addAssignment = async (req,res)=>{
    const {userID} = req.user
    req.body.createdBy = userID
    //console.log(req.body)
    await model.create(req.body)
    res.status(StatusCodes.CREATED).json({success: true,msg:`Assignment is being tracked`,data:req.body})
    
   
}
const getAssignments = async (req,res)=>{
    const {userID} = req.user
    //console.log(req.user)
    //const user = await model.find({createdBy:userID})
    //console.log(userID)
    const queryObject = {}
    queryObject.createdBy = userID
        
        let {status,title,priority,sort,filter,page,limit} = req.query
      
        if(title){
            queryObject.title = {$regex: title, $options: "i"}
            //console.log(queryObject)
            
        }
        if(status){
            queryObject.status = status
            
        }
        if(priority){
            queryObject.priority = priority
            
        }
        if(!page) page = 1
        if(!limit) limit = 5
        let amount = (page-1)*limit
        let result = model.find(queryObject)
        if(sort){
            sort = delimiter(sort)
            result = result.sort(sort)
        }
        if(filter){
            filter = delimiter(filter)
            result = result.select(filter)
        }
        result = result.skip(amount).limit(limit)
        const assignments = await result
        const nbHits = assignments.length
        res.status(StatusCodes.OK).json({success: true,message:`Assignments fetched successfully` ,data: assignments,nbHits})
    
   
    
}
const updateAssignment = async (req,res) => {
    const {userID} = req.user
    req.body.createdBy = userID
        // console.log(req.params)
        // console.log(req.body)
          const {id} = req.params
          if(req.body===undefined)   throw new badRequest("EXPECTED VALUES")
    const assignment = await model.findOneAndUpdate({_id:id,createdBy:userID},req.body,{runValidators:true,returnDocument:'after'})
   // console.log(assignment)
    if(!assignment) throw new badRequest("Assignment not in database or User not authorized to access assignment")
        //const {title,course,status,priority} = assignment
    res.status(StatusCodes.OK).json({success: true,message:`Assigment updated successfully` ,data: assignment})
   
  
}
const deleteAssignment = async (req,res) => {
    const {userID} = req.user
        const {id} = req.params
        const assignment = await model.findOneAndDelete({_id:id,createdBy:userID})
        if(!assignment) throw new badRequest('Invalid assignment ID')
        res.status(StatusCodes.OK).json({success: true, message:`Assignment is no longer being tracked`,data:assignment})
    
}

const getAssignment = async (req,res)=>{
        const {userID} = req.user
        const {id} = req.params
        let assignment = await model.findOne({_id:id,createdBy:userID})
        if(!assignment) throw new notFound('Assignment not found or user not authorized to access assignment')
            let date = new Date(assignment.dueDate)
            console.log(date)
            if(new Date()>date){
                if(assignment.status!=="complete"){
                    assignment.status = "overdue"
                    await model.findOneAndUpdate({_id:id,createdBy:userID},assignment,{returnDocument:'after',runValidators:true})
                }
            }
            else{
                if(assignment.status!=="complete"){
                    assignment.status = "pending"
                    await model.findOneAndUpdate({_id:id,createdBy:userID},assignment,{returnDocument:'after',runValidators:true})
                }
            }
            assignment = await model.findOne({_id:id,createdBy:userID})
            res.status(200).json({success: true,message:`Assingment fetched successfully` ,data: assignment})
   
}

module.exports = {addAssignment,getAssignments,updateAssignment,deleteAssignment,getAssignment}