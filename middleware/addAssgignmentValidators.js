const {body} = require('express-validator')

const arr = [body('title').notEmpty(),body('course').notEmpty(),body('status').notEmpty(),body('priority').notEmpty(),body('dueDate').notEmpty()]
module.exports = arr
