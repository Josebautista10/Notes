import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import getDate from '../utils/getDate'
import NewNote from './Notes/NewNote'
import UpdateNote from './Notes/UpdateNote'

const normalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FCEDDA',
    padding: '1%',
    width: '50%',
    height: '50%',
    borderRadius: '15px'
  }
}
const deleteStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FF2400',
    padding: '1%',
    width: '30%',
    height: '30%',
    borderRadius: '15px'
  }
}

const Home = () => {
  const { dispatch, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [noteId, setNoteId] = useState('')
  const [newNote, setNewNote] = useState(false)
  const [updateNote, setUpdateNote] = useState(false)
  const [deleteNote, setDeleteNote] = useState(false)

  const modalStyles = () => {
    if (updateNote || newNote) {
      return normalStyle
    }
    return deleteStyle
  }


  const { data, loading, error, reFetch } = useFetch(
    user ? `/notes/${user._id}` : ''
  )

  const openModal = async (e) => {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const handleClick = async () => {
    dispatch({ type: 'LOGOUT' })
    axios.get('/auth/logout').then(navigate('/'))
  }

  const handleNewNote = () => {
    setUpdateNote(false)
    setDeleteNote(false)
    setNewNote(true)
    openModal(true)
  }

  const handleEdit = (id) => {
    setNoteId(id)
    setNewNote(false)
    setDeleteNote(false)
    setUpdateNote(true)
    openModal()
  }

  const handleDelete = (id) => {
    setNewNote(false)
    setUpdateNote(false)
    setDeleteNote(true)
    openModal()
  }

  const notes = data.data?.map((note) => {
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
            // onClick={() => handleEdit('update', note._id)}
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

  return (
    <div>
      <nav className='bg-burnt-orange flex justify-between text-peach'>
        <div className='ml-4 text-4xl py-1'>Note</div>
        <div className='mr-4 text-2xl flex items-center justify-evenly w-1/4'>
          <p>Welcome back {user.username}</p>
          <button onClick={handleClick}>Logout</button>
        </div>
      </nav>

      <div className='w-full flex justify-end my-5'>
        <div className='mr-5'>
          <button
            className='bg-burnt-orange text-peach transition duration-300 hover:bg-peach hover:text-burnt-orange font-bold py-2 px-4 rounded-full'
            // onClick={() => handleEdit('newNote', null)}
            onClick={handleNewNote}
            id='newNote'
          >
            New Note
          </button>
        </div>
      </div>

      <div>
        {!loading && <ul className='flex flex-wrap justify-evenly'>{notes}</ul>}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles()}
        contentLabel='Example Modal'
        appElement={document.getElementById('app')}
        // fix this!!!!!!!
        ariaHideApp={false}
      >
        {deleteNote && <p>you sure</p>}
        {updateNote && (
          <UpdateNote
            closeModal={closeModal}
            id={user._id}
            noteId={noteId}
            reFetch={reFetch}
          />
        )}
        {newNote && (
          <NewNote closeModal={closeModal} id={user._id} reFetch={reFetch} />
        )}
      </Modal>
    </div>
  )
}

export default Home
