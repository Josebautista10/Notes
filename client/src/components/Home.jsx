import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'

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

  const { data, loading, error } = useFetch(user ? `/notes/${user._id}` : '')

  if (!user) {
    return <Navigate to='/' replace />
  }

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

  const getDate = (date) => {
    const time = new Date(date)
    const finalDate = new Date(time)
    return `${finalDate}`
  }

  console.log(Array.isArray(data.data))
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
          <p>Welcome back {user?.username}</p>
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
      <button>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        appElement={document.getElementById('app')}
      >
        <div className='flex flex-col w-8/10'>
          <header className=''>Tell me what's on your mind</header>
          <input
            type='text'
            className='px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                mb-8
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                '
          />

          <button onClick={closeModal}>close</button>
          <form></form>
        </div>
      </Modal>
    </div>
  )
}

export default Home
