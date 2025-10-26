// utils/middleware.js
// Handler for requests made to unknown endpoints (routes that don't exist).
// Placed as the last route to catch any requests that fell through all the specific route handlers
const unknownEndpoint = (request, response) => {
  // Set the HTTP status code to 404 (Not Found). Send a JSON response body indicating the error.
  response.status(404).send({ error: 'unknown endpoint' })
}

// Basic error handling middleware - Define a middleware function named errorHandler.
// errorHandler takes four standard Express error-handling middleware arguments: error, request, response, and next.
const errorHandler = (error, request, response, next) => {
  console.error(error.message) // Log the specific error message to the console for server-side debugging.
  // Checks if the error is a 'CastError'. Example when an ID format is invalid (e.g., using a badly formatted ID string to GET a MongoDB document).
  if (error.name === 'CastError') {
    // If CastError, sets the status to 400 (Bad Request), and send a JSON response indicating a malformatted ID.
    // The 'return' stops further execution of the middleware for this request.
    return response.status(400).send({ error: 'malformatted id' })
    // ELSE: Checks if the error is a 'ValidationError' - If data fails Mongoose schema validation rules (e.g., a required field is missing).
  } else if (error.name === 'ValidationError') {
    // If ValidationError, sets the status to 400 (Bad Request), and send a JSON response with the specific validation error message provided by Mongoose.
    return response.status(400).json({ error: error.message })
  }
  // If error not handled by CastError or ValidationError, pass the error on to the default Express error handler.
  next(error)
}
// Exports the functions so they can be imported and used in other files (app.js file).
module.exports = {
  unknownEndpoint,
  errorHandler,
}
