import express from 'express'
import {
  getUserNotes,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from '../controllers/userController.js'
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router()

// UPDATE
router.put('/:userid', verifyUser, updateUser)

// DELETE
router.delete('/:userid', verifyUser, deleteUser)

// GET
router.get('/:userid', verifyUser, getUser)

// GET ALL
router.get('/', verifyAdmin, getUsers)

export default router
