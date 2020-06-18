const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('Blogs are returned as JSON:', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All notes are returned:', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('Blog\'s  identifier is "id":', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('A valid blog can be added:', async () => {
  const newBlog = {
    title: "A valid blog from test",
    author: "Robin Huumonen",
    url: "https://ei-toimi.fi/",
    likes: "0"
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain(
    "A valid blog from test"
  )

})

test('If blog\'s likes are undefined, likes are set to zero:', async () => {
  const newBlog = {
    title: "Blog from test with undefined likes",
    author: "Robin Huumonen",
    url: "https://ei-toimi.fi/"
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(blog => blog.likes)
  
  expect(likes[blogsAtEnd.length - 1]).toBe(0)

})

test('If blog\'s title/url is undefined, get HTTP code 400 as a response:', async () => {
  const newBlog = {
    author: "From test, should be a bad request",
    likes: 2
  }
  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

// npm test -- -t 'A valid blog can be added:'
