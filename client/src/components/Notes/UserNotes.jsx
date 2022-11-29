import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import getDate from '../../utils/getDate'

const UserNotes = ({ notes, handleEdit, handleDelete }) => {
  return notes.map((note) => {
    return (
      <li
        key={note._id}
        id={note._id}
        className='flex flex-col bg-burnt-orange w-3/4 md:w-2/5 lg:w-1/5 h-32 md:h-36 lg:h-40 rounded p-2 m-3 text-peach justify-between'
      >
          <p className='font-bold m-0 p-0'>{getDate(note.createdAt)}</p>
        <div className='flex flex-col justify-center items-center'>
          <p className='w-11/12'>{note.description}</p>
        </div>
        <div className='flex justify-end text-xl '>
          <button
            className='mr-2 hover:text-blue-500'
            id='updateNote'
            onClick={() => handleEdit(note._id)}
          >
            <BsFillPencilFill />
          </button>
          <button
            className='mr-2 hover:text-red-800'
            onClick={() => handleDelete(note._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      </li>
    )
  })
}

export default UserNotes
