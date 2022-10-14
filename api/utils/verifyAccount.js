import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import createError from '../utils/error.js'


export const verifyAccount = async (account) => {
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    account.password
  )
  if (!isPasswordCorrect)
    return next(createError(404, 'Wrong password or username!'))

  const token = jwt.sign(
    { id: account._id, isAdmin: account.isAdmin },
    process.env.JWT
  )

  res
    .cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json({ ...details })

  const { password, isAdmin, ...details } = account._doc
}