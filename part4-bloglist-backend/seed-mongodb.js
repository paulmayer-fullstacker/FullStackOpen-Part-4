// seed-mongodb.js:
// Script to seed the MongoDB 'blogs' collection with initial data.
const mongoose = require('mongoose')
const config = require('./models/blog')

// The 'app.js' file creates the Blog model. Required to ensure the model is registered with Mongoose before seed uses it.
// const app = require('./app')  // IS THIS LINE REQUIRED, OR NOT?
const Blog = mongoose.model('Blog')

// Array of initial test blog objects to insert
const initialBlogs = [
  {
    title: 'Seeded Blog Post No 1',
    author: 'Seeded Author_1',
    url: 'http://SeededAuthor_1.com/Seeded-Blog-Post-No1',
    likes: 11,
  },
  {
    title: 'Seeded Blog Post No 2',
    author: 'Seeded Author_2',
    url: 'http://SeededAuthor_2.com/Seeded-Blog-Post-No2',
    likes: 22,
  },
  {
    title: 'Seeded Blog Post No 3',
    author: 'Seeded Author_3',
    url: 'http://SeededAuthor_3.com/Seeded-Blog-Post-No3',
    likes: 33,
  },
]

const seedDatabase = async () => {
  console.log('--- Starting Database Seeding ---')

  try {
    // Connect to MongoDB using the URI from config
    await mongoose.connect(config.MONGODB_URI)
    console.log('Successfully connected to MongoDB.')

    // Clear the collection to ensure a clean state
    console.log('Clearing existing blogs...')
    await Blog.deleteMany({}) // Deletes all documents in the Blog collection
    console.log('Collection cleared.')

    // Insert the initial data array
    console.log(`Inserting ${initialBlogs.length} initial blogs...`)
    await Blog.insertMany(initialBlogs) // Inserts all objects in the array at once
    console.log('Database seeding complete.')

  } catch (error) {
    console.error('ERROR during database seeding:', error.message)
    // Exit with a failure code
    process.exit(1)
  } finally {
    // Close the MongoDB connection
    console.log('Closing MongoDB connection.')
    await mongoose.connection.close()
  }
}

// Execute the seeding function
seedDatabase()
