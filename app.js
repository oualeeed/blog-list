const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/bolgs')
const config = require('./utils/config')

const app = express()

mongoose.connect(config.MONGODB_URI).then(result => {
    console.log('connected to MongoDB')
}).catch( error => console.error('error connecting to MongoDB', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app