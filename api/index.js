import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import notesRoute from './routes/notes.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
  } catch (error) {
    handleError(error)
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected😢')
})

mongoose.connection.on('connected', () => {
  console.log('mongoDB is connected😁')
})

// middlewares

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/notes', notesRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(8000, () => {
  connect()
  console.log('Connected to backend at port 8000👨‍💻')
})
