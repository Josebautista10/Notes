import express from 'express'
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote
} from '../controllers/noteController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
const router = express.Router()

// CREATE
router.post('/:userid', verifyUser, createNote)

// UPDATE
router.put('/:userid/:id', verifyUser, updateNote)

// DELETE
router.delete('/:userid/:id', verifyUser, deleteNote)

// GET
router.get('/:userid/:id', verifyUser, getNote)

// GET ALL
// router.get('/', verifyAdmin, getNotes)

export default router
