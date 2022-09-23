import express from 'express'
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote
} from '../controllers/noteController.js'
import { verifyAdmin, verifyUser } from '../utils/verifiedToken.js'
const router = express.Router()

// CREATE
router.post('/:userid', verifyUser, createNote)

// UPDATE
router.put('/:id', verifyUser, updateNote)

// DELETE
router.delete('/:id', verifyUser, deleteNote)

// GET
router.get('/:id', verifyUser, getNote)

// GET ALL
router.get('/', verifyUser, getNotes)

export default router
