const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const testHelper = require('./helper_test')

const api = supertest(app)

beforeEach(async () => {
  const { initialesBlogs } = testHelper
  await Blog.deleteMany({})

  const Blogs = initialesBlogs.map((blog) => new Blog(blog))
  const arrayOfPromises = Blogs.map((blog) => blog.save())
  await Promise.all(arrayOfPromises)
}, 100000)

test('returns all the blogs posts in the JSON format.', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(6)
}, 100000)

test('every blog post is defined by the id proprety', async () => {
  const response = await api.get('/api/blogs/')
  expect(response.body[0].id).toBeDefined()
}, 100000)

test('a new blog can be added', async () => {
  const blog = {
    title: 'XML is the future',
    author: 'Bite code!',
    url: 'https://www.bitecode.dev/p/hype-cycles',
    likes: 0,
  }

  const response = await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs')
  expect((blogs).body).toHaveLength(testHelper.initialesBlogs.length + 1)
  expect((blogs).body).toContainEqual(response.body)
  await Blog.findByIdAndRemove(response.body.id)
}, 100000)

test('If the likes proprety is messing from the bldy request it will saved as zero.', async () => {
  const blog = {
    title: 'i\'ll be deleted soon',
    author: 'author',
    url: 'url',
  }

  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
  await Blog.findByIdAndRemove(response.body.id)
})

test('A messing title lead to a badd request 400', async () => {
  const blog = {
    title: '',
    author: 'no title',
    url: 'url',
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('A messing author name lead to a badd request 400', async () => {
  const blog = {
    title: 'no author',
    author: '',
    url: 'url',
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('A given bolg can be deleted', async () => {
  const response = api.get('/api/blogs/')
  const { id } = (await response).body[0]
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const blogs = await api.get('/api/blogs')
  expect(blogs.body).toHaveLength(testHelper.initialesBlogs.length - 1)
})

test('a blog can be edited by a put request', async () => {
  const response = await api.get('/api/blogs')
  let blogTobeEdited = response.body[0]

  blogTobeEdited = {
    ...blogTobeEdited,
    title: 'Edited title',
    likes: 10,
  }
  await api
    .put(`/api/blogs/${blogTobeEdited.id}`)
    .send(blogTobeEdited)
    .expect(200)

  const result = api.get('/api/blogs')
  expect((await result).body).toContainEqual(blogTobeEdited)
})

afterAll(async () => {
  await mongoose.connection.close()
})
