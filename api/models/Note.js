import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema(
  {
    description: { type: String, required: true},
    image: { type: String, },
    date: { type: Date, required: true},
  },
  { timestamps: true }
)

export default mongoose.model('Note', NoteSchema)
