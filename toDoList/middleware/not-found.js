//function to signal that the route of the site does not exist
const notFound = (req, res) => res.status(404).send("Route does not exist")

module.exports = notFound;