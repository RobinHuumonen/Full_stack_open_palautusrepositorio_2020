const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  
  if (!(blog.title || blog.url)) {
    res.status(400).end()
  } else {
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  }
  
})

module.exports = blogsRouter
