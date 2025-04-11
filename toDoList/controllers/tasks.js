const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async') //using this function we stop repeating try{}catch{error}

//function to return all tasks
const getAllTasks = asyncWrapper (async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({tasks})
})

//function to create a task and return it
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({task})
  
})

//function to get a specific task from it's ID, and return said task
const getTask = asyncWrapper(async (req, res) => {
  const {id: taskID} = req.params
  const task = await Task.findOne({_id: taskID})
  if (!task) {
    return res.status(404).json({msg: `No task with id: ${taskID}`})
   }
  res.status(200).json({task})
})

//function to update a specific task after changing it's name or status
const updateTask = asyncWrapper(async (req, res) => {
  const {id: taskID} = req.params
   const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {new: true, runValidators: true})// using {new, run Validators} we update the task in real time
  if (!task) {
    return res.status(404).json({msg: `No task with id: ${taskID}`})
   }
   res.status(200).json({task})
})

//function to delete a specific task by it's id
const deleteTask = asyncWrapper(async (req, res) => {
  const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID})
    if (!task) {
      return res.status(404).json({msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({task})
})

//exporting the functions to 'routes' folder for tasks.js
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}