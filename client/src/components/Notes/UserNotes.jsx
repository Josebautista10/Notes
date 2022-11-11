import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import getDate from '../../utils/getDate'


const UserNotes = ({notes, handleEdit, handleDelete}) => {
  return notes.map((note) => {
    return (
      <li
        key={note._id}
        id={note._id}
        className='flex flex-col bg-burnt-orange w-1/5 rounded p-2 m-3 text-peach'
      >
        <p>{getDate(note.createdAt)}</p>
        <p>{note.description}</p>
        <div className='flex justify-end text-xl '>
          <button
            className='mr-2  hover:text-blue-500'
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