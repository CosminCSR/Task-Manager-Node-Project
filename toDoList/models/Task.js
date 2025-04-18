const mongoose = require('mongoose') //importing monhoose library for MongoDB

//each data must have a name and a status with specific conditions
const TaskSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Task', TaskSchema)