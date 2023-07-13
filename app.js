const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/bolgs')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('connected to MongoDB')
}).catch((error) => logger.info('error connecting to MongoDB', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
