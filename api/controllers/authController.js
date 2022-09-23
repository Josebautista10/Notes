import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import createError from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username })

  if (user) return next(createError(404, 'Username already taken!'))

  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    })
    await newUser.save()
    console.log(newUser);
    res.status(201).send('User has been created')
  } catch (err) {
    console.log(err)
    next(err)
  }
}
export const login = async (req, res, next) => {
  
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, 'Account not found!'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(404, 'Wrong password or username!'))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    const { password, isAdmin, ...details } = user._doc

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...details })
  } catch (err) {
    next(err)
  }
}
