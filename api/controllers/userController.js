import Note from '../models/Note.js'
import User from '../models/User.js'

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userid,
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
    const deletedUser = await User.findByIdAndDelete(req.params.userid, {
      $set: req.body
    })
    res.json(deletedUser)
  } catch (error) {
    next(error)
  }
}


export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export const getUserNotes = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid)

    res.json(user.notes)
  } catch (error) {
    next(error)
  }
}
