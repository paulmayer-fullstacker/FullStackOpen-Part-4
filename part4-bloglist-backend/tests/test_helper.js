// tests/test_helper.js:
const Blog = require('../models/blog')   // Import the Blog Mongoose Model
// An array of blogs to initialize the test database before API tests (in bloglist_api.test.js).
const listOfTestBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'Test Blog No 1',
    author: 'Test Author One',
    url: 'https://test-bloglist.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Test Blog No 2',
    author: 'Test Author Two',
    url: 'https://test-bloglist.com/',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Test Blog No 3',
    author: 'Test Author Three',
    url: 'https://test-bloglist.com/',
    likes: 12,
    __v: 0
  }]
// Blog object used specifically for successful POST request tests.
const additionalTestBlog =
  {
    title: 'Additional Test Blog No 1',
    author: 'Additional Test Author',
    url: 'https://test-bloglist.com/',
    likes: 7
  }
// Blog object without likes, for testing the 'likes' default value on POST requests.
const testBlogWithoutLikes =
  {
    title: 'Additional Test Blog No 1',
    author: 'Additional Test Author',
    url: 'https://test-bloglist.com/'
  }
// Blog object without a title, for testing the required 'title' validation on POST requests.
const testBlogWithoutTitle =
  {
    author: 'Additional Test Author',
    url: 'https://test-bloglist.com/',
    likes: 7
  }
// Blog object without a URL, for testing the required 'url' validation on POST requests.
const testBlogWithoutURL =
  {
    title: 'Additional Test Blog No 1',
    author: 'Additional Test Author',
    likes: 7
  }
// Utility function to generate a valid Mongoose ID that will not to exist in the database.
const testBlogWithoutId = async () => {
  // Create a new testBlog object
  const blog = new Blog({ title: 'to be removed after issue of id', url: 'tempurl', author: 'temp', likes: 0 })
  await blog.save()  // Save the blog object, to get a unique Mongoose ID.
  await blog.deleteOne()  // Immediately delete the blog object
  return blog._id.toString()  // Return the ID of the deleted blog. This is a valid ID known not to exist in the DB.
}

// Function to fetch all blogs directly from the database for verifying API side-effects.
const currentBlogsInDb = async () => {
  const blogs = await Blog.find({})  // Fetches all documents using the Mongoose Model
  return blogs.map(blog => blog.toJSON())  // Converts each Mongoose document to a plain JavaScript object with toJSON applied.
}
// Export test data and utility functions for use in bloglist_api.test.js.
module.exports = {
  listOfTestBlogs,
  additionalTestBlog,
  testBlogWithoutLikes,
  testBlogWithoutTitle,
  testBlogWithoutURL,
  currentBlogsInDb,
  testBlogWithoutId
}