/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)
