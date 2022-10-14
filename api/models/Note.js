import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema(
  {
    description: { type: String, required: true},
    image: { type: String },
    date: { type: Date, required: true},
    userId: { type: String }
  },
  { timestamps: true }
)

export default mongoose.model('Note', NoteSchema)
