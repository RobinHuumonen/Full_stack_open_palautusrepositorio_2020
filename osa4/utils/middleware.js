const logger = require('./logger')

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError: invalid signature') {
    return res.status(401).json({ error: error.message })
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

  req.token = getTokenFrom(req)
  next()
}

module.exports = { errorHandler, tokenExtractor }