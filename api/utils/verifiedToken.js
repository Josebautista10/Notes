import jwt from 'jsonwebtoken';
import createError from './error.js';

export const verifiedToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(createError(401, 'You are not authenticated!'))
  }

  jwt.verify(token, process.env.JWT, (err,user) => {
    if (err) return next(createError(401, 'Token is not valid!'))
    req.user = user
    next()
  })
}

export const verifyUser = (req, res, next) => {
  console.log(req.params)
  verifiedToken(req, res, () => {

    if (req.user.id === req.params.userid || req.user.isAdmin) {
      next()
    } else {
      return next(createError(401, 'You are not authorized!'))
    }
  })
}

export const verifyAdmin = (req, res, next) => {
  verifiedToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      return next(createError(401, 'You are not authorized!'))
    }
  })
}