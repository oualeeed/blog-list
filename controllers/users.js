const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

const User = require('../models/user')
require('express-async-errors')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  response.json(user)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = password > 3 && password.length
    ? await bcrypt.hash(password, saltRounds)
    : password

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter
