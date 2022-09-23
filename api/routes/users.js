import express from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../controllers/userController.js'
import { verifiedToken, verifyAdmin, verifyUser } from '../utils/verifiedToken.js'
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
router.put('/:id', verifyUser, updateUser)

// DELETE
router.delete('/:id', verifyUser, deleteUser)

// GET
router.get('/:id', verifyUser, getUser)

// GET ALL
router.get('/', verifyAdmin, getUsers)

export default router