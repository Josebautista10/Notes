import User from '../models/User.js'

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.json(updateUser)
  } catch (error) {
    next(error)
  }
}
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id, {
      $set: req.body
    })
    res.json(deletedUser)
  } catch (error) {
    next(error)
  }
}
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(req.params.id)
    res.json(users)
  } catch (error) {
    next(error)
  }
}
