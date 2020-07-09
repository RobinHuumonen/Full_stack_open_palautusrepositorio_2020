const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  res.json(blogs.map(b => b.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  
  if (!req.token) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!(blog.title || blog.url)) {
    res.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  }
  
})

blogsRouter.delete('/:id', async (req, res) => {

  
  if (!req.token) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(req.params.id)
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(blog.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
