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

// router.get('/checkauthentication', verifiedToken, (req, res, next) => {
//   res.send("hello, you are authenticated!")
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send("hello User, you are logged in and you can delete your account")
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.send("hello Admin, you are logged in and you can delete all accounts")
// })

// UPDATE
router.put('/:userid', verifyUser, updateUser)

// DELETE
router.delete('/:userid', verifyUser, deleteUser)

// GET
router.get('/:userid', verifyUser, getUser)

// GET ALL
router.get('/', verifyAdmin, getUsers)

// router.get('/:userid/notes', verifyUser, getUserNotes)

export default router
