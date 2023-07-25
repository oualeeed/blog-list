const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    return response.status(400).send({ error: error.message })
  }
  return next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const requestLogger = (request, response, next) => {
  logger.info('----------------')
  logger.info('Path', request.path)
  logger.info('body', request.body)
  logger.info('----------------')
  next()
}

module.exports = { errorHandler, tokenExtractor, requestLogger }
