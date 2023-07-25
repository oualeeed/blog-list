const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

// eslint-disable-next-line consistent-return
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordIsCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false
  if (!passwordIsCorrect) {
    return response.status(401).json({
      error: 'password or username is incorrect',
    })
  }

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  }
  const token = jwt.sign(userForToken, config.SECRET)
  response
    .status(200)
    .json({
      token,
      username,
      name: user.name,
    })
})

module.exports = loginRouter
