const express = require('express')
const router = express.Router()
const addValidators = require('../middleware/addAssgignmentValidators')
const checkValidation = require('../middleware/checkValidation')
const {addAssignment,getAssignments,updateAssignment,deleteAssignment,getAssignment} = require('../controllers/assignmentController')
router.route('/').post(addValidators,checkValidation,addAssignment).get(getAssignments)
router.route('/:id').patch(addValidators,checkValidation,updateAssignment).delete(deleteAssignment).get(getAssignment)
module.exports = router