const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const users = await User.find({})
  const userAtFirst = users[0]
  const blog = new Blog({
    ...request.body,
    user: userAtFirst.id,
  })
  const result = await blog.save()
  // eslint-disable-next-line no-underscore-dangle
  userAtFirst.blogs = userAtFirst.blogs.concat(result._id)
  await userAtFirst.save()

  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter
