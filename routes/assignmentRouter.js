const express = require('express')

const router = express.Router()
const {addAssignment,getAssignments,updateAssignment,deleteAssignment,getAssignment} = require('../controllers/assignmentController')
router.route('/').post(addAssignment).get(getAssignments)
router.route('/:id').patch(updateAssignment).delete(deleteAssignment).get(getAssignment)
module.exports = router