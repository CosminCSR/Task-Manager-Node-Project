//function to not repeat try{} catch{error}
const asyncWrapper = (fn) => {
  return async(req, res, next) => {
    try {

    await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = asyncWrapper;