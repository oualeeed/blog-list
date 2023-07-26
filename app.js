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
const loginRouter = require('./controllers/login')

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
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app
