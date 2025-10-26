// controlers/blogs.js:
const blogsRouter = require('express').Router()  // Creates a new Express router instance for blog routes
const Blog = require('../models/blog')  // Imports the Blog Mongoose Model from models/blog.js for database operations

// Route to fetch all blogs. Uses async/await and passes errors to middleware via next().
blogsRouter.get('/', async (request, response, next) => {
  try {
    // Find all blogs from the database
    const blogs = await Blog.find({})

    // Send the fetched blogs back to the client. The response is returned as the blogs in a JSON format
    response.json(blogs)
  } catch (exception) {
    // If an error occurs during the database query, pass it to the error handling middleware
    next(exception)
  }
})

// Route to handle creation of a new blog. Uses async/await and passes errors to middleware via next().
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body   // Extract the data sent in the request body.

  // Create a new Mongoose document instance based on the request body data.
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    // Ensure likes defaults to 0 if not provided in the request
    likes: body.likes || 0,
  })

  try {
    // The blogSchema defines 'title' and 'url' as required. Mongoose validation throws an error if they are missing.
    const savedBlog = await blog.save()    // Saves the new blog document to the MongoDB database.
    // Send a 201 Created status code and the saved document back.
    response.status(201).json(savedBlog)
  } catch (exception) {
    // Errors from validation (like missing title/url) or database connection are passed to error handling middleware.
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    // Find the blog by its ID (from the route parameter), and removes it from the database.
    await Blog.findByIdAndDelete(request.params.id)
    // Send a 204 No Content status code, indicating successful deletion.
    response.status(204).end()
  } catch (exception) {
    next(exception) // Pass errors (i.e., bad ID format) to error middleware.
  }
})

// Route to handle updating an existing blog.
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body   // The new data for the blog, from the request body.
  const blogId = request.params.id   // The ID of the blog to be updated.
  // Create the blog object containing the new data. The request body contains the fields to be updated.
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    // Find the blog by ID and update it with the new content.
    // { new: true } tells Mongoose to return the *new* updated document, not the original one.
    // { runValidators: true } ensures Mongoose runs the schema validation (e.g., required fields)
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true, runValidators: true })

    if (updatedBlog) {
      // Respond with 200 OK and the updated blog object
      response.json(updatedBlog)
    } else {
      // If findByIdAndUpdate returns null, the blog was not found. Sends 404 Not Found.
      response.status(404).end()
    }
  } catch (exception) {
    // Pass errors (e.g., CastError from bad ID, or Validation error from runValidators: true) to middleware
    next(exception)
  }
})

// Export the router module for use in app.js
module.exports = blogsRouter
