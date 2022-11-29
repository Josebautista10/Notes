import Note from '../models/Note.js'
import User from '../models/User.js'

export const createNote = async (req, res, next) => {
  const userId = req.params.userid

  const noteInfo = { ...req.body, userId }
  const newNote = new Note(noteInfo)

  try {
    const savedNote = await newNote.save()
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
  const note = await Note.findById(req.params.id)
  const userNoteId = note.userId
  if (!req.params.userid === userNoteId)
    return next(createError(401, 'You are not authorized!'))

  try {
    await Note.findByIdAndDelete(req.params.id, {
      $set: req.body
    })
    res.json('note deleted')
  } catch (error) {
    next(error)
  }
}

export const getNote = async (req, res, next) => {
  const note = await Note.findById(req.params.id)
  const userNoteId = note.userId
  if (!req.params.userid === userNoteId)
    return next(createError(401, 'You are not authorized!'))
  try {
    res.json(note)
  } catch (error) {
    next(error)
  }
}
export const getNotes = async (req, res, next) => {
  const notes = await Note.find({userId: req.params.userid})
  try {
    res.json(notes)
  } catch (error) {
    next(error)
  }
}
