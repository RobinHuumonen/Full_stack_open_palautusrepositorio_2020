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
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik11bW1vIiwiaWQiOiI1ZWYwYjFhYmQzZWFiNjIzYjhmNGU4MjYiLCJpYXQiOjE1OTI4OTg3NDR9.k3fitmg90sdQoqLYS96V5sBqVmOTaw0mgfwf1SQQLkk')
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
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik11bW1vIiwiaWQiOiI1ZWYwYjFhYmQzZWFiNjIzYjhmNGU4MjYiLCJpYXQiOjE1OTI4OTg3NDR9.k3fitmg90sdQoqLYS96V5sBqVmOTaw0mgfwf1SQQLkk')
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
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik11bW1vIiwiaWQiOiI1ZWYwYjFhYmQzZWFiNjIzYjhmNGU4MjYiLCJpYXQiOjE1OTI4OTg3NDR9.k3fitmg90sdQoqLYS96V5sBqVmOTaw0mgfwf1SQQLkk')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('Individual blog can be deleted:', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[Math.floor(Math.random() * blogsAtStart.length)]
  
  await api 
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const identifiers = blogsAtEnd.map(blog => blog.id)

  expect(identifiers).not.toContain(blogToDelete.id)
  
})

test('Blog\'s likes can be updated:', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[Math.floor(Math.random() * blogsAtStart.length)]
  const newBlog = {
    likes: Math.floor(Math.random() * Math.pow(10, 3))
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.filter(blog => blog.id == blogToUpdate.id)
  expect(updatedBlog[0].likes).toBe(newBlog.likes)
})

test('Unauthorized user cannot add blogs:', async () => {
  const newBlog = {
    title: "A valid blog from test",
    author: "Robin Huumonen without token",
    url: "https://ei-toimi.fi/",
    likes: "0"
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(
    "A valid blog from test"
  )
})

afterAll(() => {
  mongoose.connection.close()
})