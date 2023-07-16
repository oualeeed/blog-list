const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors')
const blogRouter = require('./controllers/bolgs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('connected to MongoDB')
}).catch((error) => logger.info('error connecting to MongoDB', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)

module.exports = app
