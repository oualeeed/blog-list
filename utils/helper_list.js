const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.reduce(reducer, 0)
}

const getFavoriteBlog = (blogs) => {
  // eslint-disable-next-line arrow-body-style
  const reducer = (favoriteBlog, currentBlog) => {
    return favoriteBlog.likes < currentBlog.likes
      ? currentBlog
      : favoriteBlog
  }

  const favoriteBlog = blogs.length === 0
    ? null
    : blogs.reduce(reducer, blogs[0])
  if (!favoriteBlog) return null

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const numberOfArticles = {}

  blogs.forEach((blog) => {
    numberOfArticles[blog.author] = numberOfArticles[blog.author] + 1 || 1
  })

  const reducer = (answer, current) => (numberOfArticles[answer] > numberOfArticles[current]
    ? answer
    : current)

  const mostBloger = Object.keys(numberOfArticles).reduce(reducer, numberOfArticles[0])
  return {
    author: mostBloger,
    blogs: numberOfArticles[mostBloger],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const numberOflikes = {}

  blogs.forEach((blog) => {
    numberOflikes[blog.author] = numberOflikes[blog.author] + blog.likes || blog.likes
  })

  const reducer = (answer, current) => (numberOflikes[answer] > numberOflikes[current]
    ? answer
    : current)

  const mostBloger = Object.keys(numberOflikes).reduce(reducer, numberOflikes[0])
  return {
    author: mostBloger,
    likes: numberOflikes[mostBloger],
  }
}

module.exports = {
  totalLikes, getFavoriteBlog, mostBlogs, mostLikes,
}
