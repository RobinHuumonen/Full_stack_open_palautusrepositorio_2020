const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password === undefined || body.password.length < 3) {
    return res.status(400).json({ error: 'Password validation failed: password: Path `password` (`Is`) is shorter than the minimum allowed length (3) or undefined.'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter