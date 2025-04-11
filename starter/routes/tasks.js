//importing express.js framework to create a router instance
const express = require('express')
const router = express.Router()

//importing functions for a more clean and organized look
const {getAllTasks, createTask, getTask, updateTask, deleteTask} = require('../controllers/tasks')

//for each route of the site it will handle specific functions
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router