import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import getDate from '../utils/getDate'
import NewNote from './NewNote'

const customStyles = {
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

const Home = () => {
  const { dispatch, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false)

  const { data, loading, error, reFetch } = useFetch(user ? `/notes/${user._id}` : '')


  // let subtitle;

  function openModal() {
    setIsOpen(true)
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false)
  }

  const handleClick = async (e) => {
    dispatch({ type: 'LOGOUT' })
    axios.get('/auth/logout').then(navigate('/'))
  }

  const notes = data.data?.map((note) => {
    return (
      <li key={note._id}>
        <p>{getDate(note.createdAt)}</p>
        <p>{note.description}</p>
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
      <div className=''>
        <div>
          <button className='bg-burnt-orange' onClick={openModal}>
            New Note
          </button>
        </div>
      </div>
      <div>
        <ul>{notes}</ul>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        appElement={document.getElementById('app')}
      >
        <NewNote closeModal={closeModal} id={user._id} reFetch={reFetch}/>
      </Modal>
    </div>
  )
}

export default Home
