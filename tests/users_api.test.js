const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const testHelper = require('./helper_test')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const users2 = []
  testHelper.initialUsers.forEach(async (user) => {
    const hash = bcrypt.hashSync(user.password, 10)
    users2.push({
      username: user.username,
      name: user.name,
      passwordHash: hash,
    })
  })
  const users = users2.map((user) => new User(user))
  const promises = users.map((user) => user.save())
  await Promise.all(promises)
})

describe('The GET method', () => {
  test('returns all the users posts in the JSON format.', async () => {
    const response = await api
      .get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(5)
  })

  test('can get one user by its id', async () => {
    const users = await testHelper.usersInDb()
    const firstUser = users[0]
    const response = await api
      .get(`/api/users/${firstUser.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(firstUser)
  })
})

describe('The Post method : invalid users don\'t get in', () => {
  test('adding a user with empty username', async () => {
    const user = {
      username: '',
      password: '1337',
      name: 'name',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('adding a user with empty password ', async () => {
    const user = {
      username: 'dude',
      password: '',
      name: 'name',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('adding a user with password less then 3 characters', async () => {
    const user = {
      username: 'dude',
      password: 'dh',
      name: 'name',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('The POST method : valid case', () => {
  test('valid user can be added', async () => {
    const user = {
      username: 'dah',
      name: 'doh',
      password: 'admin123456',
    }
    const u = await api
      .post('/api/users/')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await testHelper.usersInDb()
    expect(users).toHaveLength(testHelper.initialUsers.length + 1)
    await User.findByIdAndRemove(u.id)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
