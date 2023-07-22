const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors')
const blogRouter = require('./controllers/bolgs')
const userRouter = require('./controllers/users')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('error connecting to mongoDB', error.message)
  }
}

connect()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(middleware.errorHandler)

module.exports = app
