import Note from '../models/Note.js'
import User from '../models/User.js'

export const createNote = async (req, res, next) => {
  const userId = req.params.userid
  const newNote = new Note(req.body)

  try {
    const savedNote = await newNote.save()
    try {
      await User.findByIdAndUpdate(userId, { $push: { notes: savedNote._id } })
    } catch (error) {
      next(error)
    }
    res.json(savedNote)
  } catch (error) {
    next(error)
  }
}

export const updateNote = async (req, res, next) => {
  try {
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.json(updateNote)
  } catch (error) {
    next(error)
  }
}
export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id, {
      $set: req.body
    })
    res.json(deletedNote)
  } catch (error) {
    next(error)
  }
}
export const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
    res.json(note)
  } catch (error) {
    next(error)
  }
}
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find(req.params.id)
    res.json(notes)
  } catch (error) {
    next(error)
  }
}
