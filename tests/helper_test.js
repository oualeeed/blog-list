const User = require('../models/user')

const initialesBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const initialUsers = [
  {
    username: 'Oualeed',
    password: 'password',
    name: 'Oualid El-feraoui',
  },
  {
    username: 'z3aibila',
    password: 'password1',
    name: 'Oussama El-feraoui',
  },
  {
    username: 'Laroussia',
    password: 'password2',
    name: 'Asmae Bachiri Laaroussi',
  },
  {
    username: 'briwita',
    password: 'password4',
    name: 'Mustapha El-ketoni',
  },
  {
    username: 'b3iwida',
    password: 'password5',
    name: 'Abdo',
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const authenticateAndGetToken = async (api) => {
  const userForTest = {
    username: 'Oualid',
    password: 'password',
  }
  const { body } = await api
    .post('/api/login')
    .send(userForTest)

  return body.token
}

const userForTest = async () => {
  const savedUser = await User.findOne({ username: 'Oualid' })
  return savedUser
}
module.exports = {
  initialesBlogs, initialUsers, usersInDb, userForTest, authenticateAndGetToken,
}
