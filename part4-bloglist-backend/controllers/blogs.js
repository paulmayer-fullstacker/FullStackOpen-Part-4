// controlers/blogs.js:

const blogsRouter = require('express').Router()
const Blog = require('../models/blog') // Import the Blog model

// Routes

// GET all blogs
// Define a handler for HTTP GET requests to the /api/blogs endpoint. Uses async for asynchronous database operation.
blogsRouter.get('/', async (request, response) => {
  try {
    // Find all blogs from the database
    const blogs = await Blog.find({})     // await pauses execution until the query is complete.
    response.json(blogs)                 // Send the retrieved array of blogs back to the client as a JSON response.
  } catch (error) {
    // Log the error and send a 500 status
    console.error('Error fetching blogs:', error.message)
    response.status(500).json({ error: 'Failed to retrieve blogs' })  // Send a 500 Internal Server Error status code with descriptive JSON message.
  }
})

// POST new blog
// Define a handler for HTTP POST requests to /api/blogs.
blogsRouter.post('/', async (request, response) => {
  const body = request.body        // Extract the JSON payload from the request body.

  // Basic validation (title and url are required based on schema updates).
  if (!body.title || !body.url) {
    // If validation fails, send a 400 Bad Request status and stops execution.
    return response.status(400).json({ error: 'title and url are required' })
  }
  // Create a new Mongoose document instance based on the request body data.
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, // Use 0 if likes is missing.
  })

  try {
    // Save the new blog to the database
    const result = await blog.save()      // Save the new blog document to the MongoDB collection.
    response.status(201).json(result)    // and send a 201 Created status code and the saved document (inc. new ID) back as a JSON response.
  } catch (error) {
    // Log the error and send a 400 status for validation/save errors
    console.error('Error saving blog:', error.message)
    response.status(400).json({ error: 'Failed to save blog' })  // Send a 400 Bad Request status (failures generally due to bad input data).
  }
})

// Export the router module
module.exports = blogsRouter