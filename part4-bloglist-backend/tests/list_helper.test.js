// tests/list_helper.test.js:

const { test, describe } = require('node:test')
const assert = require('node:assert')

// Import the utility function file
const listHelper = require('../utils/list_helper')

// Import all necessary test data
const {
  listWithOneBlog,
  listOfBlogs,
  emptyList
} = require('./test_data')

// dummy test
describe('dummy', () => {
  // Test 1: For the simplest case, ensure the function works.
  test('dummy returns one', () => {
    // Uses the imported emptyList
    const result = listHelper.dummy(emptyList)
    assert.strictEqual(result, 1)
  })
})

// total likes tests
describe('total likes', () => {

  // The sum of an empty list of blogs must be zero.
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  // The sum of a list with only one blog equals that blog's likes.
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    // The single blog has 5 likes
    assert.strictEqual(result, 5)
  })

  // The sum of the full list of blogs is calculated correctly.
  test('of a full list is calculated correctly', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    // Sum of likes in listOfBlogs: 7 + 5 + 12 + 10 + 0 + 2 = 36
    const expectedTotalLikes = 36
    assert.strictEqual(result, expectedTotalLikes)
  })
})
// favourite blog tests
describe('favourite blog', () => {
  // The expected result for the single blog list.
  const expectedOneBlog = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
  // The expected result for the full list (likes: 7, 5, 12, 10, 0, 2). Favourite has 12 likes.
  const expectedFavourite = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12, // <-- This is the highest like count
    __v: 0
  }
  // Tests:
  // Empty List
  test('of empty list is null', () => {
    const result = listHelper.favouriteBlog(emptyList)
    assert.strictEqual(result, null)
  })

  // List with one blog
  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    // Use deepStrictEqual to ensure the returned object is identical
    assert.deepStrictEqual(result, expectedOneBlog)
  })

  // Full list
  test('of a full list is correctly identified', () => {
    const result = listHelper.favouriteBlog(listOfBlogs)
    // Use deepStrictEqual to ensure the returned object is the correct favorite
    assert.deepStrictEqual(result, expectedFavourite)
  })
})

describe('mostBlogs', () => {
  // ... (tests for empty list and list with one blog)

  test('of a full list, returns the author with the largest amount of blogs', () => {
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    // Accessing the function via the imported listHelper object
    const result = listHelper.mostBlogs(listOfBlogs)
    assert.deepStrictEqual(result, expected)
  })
})

describe('mostLikes', () => {
  // Edsger W. Dijkstra: 5 + 12 = 17 - Top Author
  const expectedTopAuthor = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }
  test('of a full list, returns the author with the largest total likes', () => {
    const result = listHelper.mostLikes(listOfBlogs)
    assert.deepStrictEqual(result, expectedTopAuthor)
  })
})
