// tests/mongodb-memory-server-helper.js:
// Working away from home, where I have no controle over the network.
// Connection to MongoDb Atlas became problematic. Hence, resorted to using mongodb-memory-server.
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

const connectToMemoryServer = async () => {
  // Start the in-memory server
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  // Connect Mongoose to the unique in-memory URI
  await mongoose.connect(mongoUri)
  console.log(`Connected to MongoDB Memory Server at: ${mongoUri}`)
}

const closeMemoryServer = async () => {
  if (mongoServer) {
    // Close the Mongoose connection. Then ...
    await mongoose.connection.close()
    // Stop the in-memory server
    await mongoServer.stop()
    console.log('MongoDB Memory Server stopped.')
  }
}

module.exports = {
  connectToMemoryServer,
  closeMemoryServer
}