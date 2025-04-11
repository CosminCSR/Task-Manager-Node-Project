const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

//use the environment variable PORT if defined, otherwise use 4444
const port = process.env.PORT || 4444

//function to start the server, while waiting for the database to connect
const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Port ${port} works!!`)) // shows in console that the port is working
  } catch (error) { 
    console.log(error) //shows in console that the port might not be working
  }
}

start()