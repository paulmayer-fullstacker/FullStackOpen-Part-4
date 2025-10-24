// app.js:
const express = require('express')       // Imports Express framework.
const mongoose = require('mongoose')      // Import Mongoose
const blogsRouter = require('./controllers/blogs') // Import the router module from blogs.js
const middleware = require('./utils/middleware')  // Imports the error handlers, exported from middleware.js.
const config = require('./utils/config') // Import config to get MONGODB_URI

const app = express()  // Initialization: Create the core Express application object.

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    //logger.info('connected to MongoDB')
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    //logger.error('error connection to MongoDB:', error.message)
    console.error('error connecting to MongoDB:', error.message)
  })

// Middleware
// Tell Express to use the built-in JSON parser.
// This middleware parses incoming requests with JSON payloads (i.e., frm POST requests) and makes the data available on request.body.
app.use(express.json())


// Route Mounting
// All requests to /api/blogs are passed to the blogsRouter
app.use('/api/blogs', blogsRouter)

// Error Handling Middleware (MUST be loaded last)

// Handler for requests to non-existent endpoints (404 Not Found)
app.use(middleware.unknownEndpoint)

// Handler for errors (e.g., CastError, ValidationError)
app.use(middleware.errorHandler)


// Export the configured Express application instance. Then index.js can start the server using it.
module.exports = app