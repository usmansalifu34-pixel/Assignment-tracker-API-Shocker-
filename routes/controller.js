const model = require('./assignments')
const customError = require('../middleware/createCustomError')
const delimiter = (string)=>{
    string = string.split(',').map((element)=>{return element.trim()}).join(' ')
    return string
}
const addAssignment = async (req,res,next)=>{
    
        
        
         await model.create(req.body)
         res.status(201).send("Assignment is now being tracked")
    
   
}
const getAssignments = async (req,res,next)=>{
    const queryObject = {}
        
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
        res.status(200).json({assignments,nbHits})
    
   
    
}
const updateAssignment = async (req,res,next) => {
    
        console.log(req.params)
        console.log(req.body)
          const {id} = req.params
          if(req.body===undefined)   throw new customError("EXPECTED VALUES",404)
    const assignment = await model.findOneAndUpdate({_id:id},req.body,{runValidators:true,returnDocument:'after'})
    console.log(assignment)
    if(!assignment) throw new customError("Invalid assignment id",404)
        //const {title,course,status,priority} = assignment
    res.status(200).json(assignment)
   
  
}
const deleteAssignment = async (req,res) => {
    
        const {id} = req.params
        const assignment = await model.findOneAndDelete({_id:id})
        if(!assignment) throw new customError('INVALID ID',404)
            getAssignments(req,res,next)
    
}

const getAssignment = async (req,res)=>{
    
        const {id} = req.params
        let assignment = await model.findOne({_id:id})
        if(!assignment) throw new customError('invalid id',404)
            let date = new Date(assignment.dueDate)
            console.log(date)
            if(new Date()>date){
                if(assignment.status!=="complete"){
                    assignment.status = "overdue"
                    await model.findByIdAndUpdate({_id:id},assignment,{returnDocument:'after',runValidators:true})
                }
            }
            else{
                if(assignment.status!=="complete"){
                    assignment.status = "pending"
                    await model.findByIdAndUpdate({_id:id},assignment,{returnDocument:'after',runValidators:true})
                }
            }
            assignment = await model.find({_id:id})
            res.status(200).json(assignment)
   
}

module.exports = {addAssignment,getAssignments,updateAssignment,deleteAssignment,getAssignment}