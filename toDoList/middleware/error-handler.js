//function to handle errors
const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({msg: `Something went wrong, try again later..`})
}

module.exports = errorHandlerMiddleware