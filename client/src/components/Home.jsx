import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import NewNote from './Notes/NewNote'
import UpdateNote from './Notes/UpdateNote'
import { normalStyle, deleteStyle } from '../utils/ModalStyles'
import DeleteNote from './Notes/DeleteNote'
import UserNotes from './Notes/UserNotes'

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

  const openModal = async () => {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const handleLogout = async () => {
    dispatch({ type: 'LOGOUT' })
    axios.get('/auth/logout').then(navigate('/'))
  }

  const handleNewNote = () => {
    setUpdateNote(false)
    setDeleteNote(false)
    setNewNote(true)
    openModal()
  }

  const handleEdit = (id) => {
    setNoteId(id)
    setNewNote(false)
    setDeleteNote(false)
    setUpdateNote(true)
    openModal()
  }

  const handleDelete = (id) => {
    setNoteId(id)
    setNewNote(false)
    setUpdateNote(false)
    setDeleteNote(true)
    openModal()
  }

  return (
    <div>
      <nav className='bg-burnt-orange flex justify-between text-peach'>
        <div className='ml-4 text-4xl py-1'>Notes</div>
        <div className='mr-4 text-2xl flex items-center justify-evenly w-1/4'>
          <p>Welcome back {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className='w-full flex justify-end my-5'>
        <div className='mr-5'>
          <button
            className='bg-burnt-orange text-peach transition duration-300 hover:bg-peach hover:text-burnt-orange font-bold py-2 px-4 rounded-full'
            onClick={handleNewNote}
            id='newNote'
          >
            New Note
          </button>
        </div>
      </div>

      <div>
          <ul className='flex flex-wrap justify-evenly'>
        {!loading && (
            <UserNotes
              notes={data.data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
        )}
          </ul>
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
        {deleteNote && (
          <DeleteNote
            id={user._id}
            noteId={noteId}
            reFetch={reFetch}
            closeModal={closeModal}
          />
        )}
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
