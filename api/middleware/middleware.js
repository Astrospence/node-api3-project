const User = require('../users/users-model')

function logger(req, res, next) {
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`${timeStamp}, ${method}, ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({ message: 'User does not exist'})
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error'})
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({ message: 'Missing required name field'})
  } else {
    req.name = name.trim()
    next()
  }
  next()
}

function validatePost(req, res, next) {
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({ message: 'Missing required text field'})
  } else {
    req.text = text.trim()
    next()
  }
  next()
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}