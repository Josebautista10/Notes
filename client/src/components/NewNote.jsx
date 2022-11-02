import axios from 'axios'
import { useState } from 'react'
import { GiCancel } from 'react-icons/gi'

const NewNote = ({ closeModal, id, reFetch}) => {
  const [credentials, setCredentials] = useState({
    description: undefined
  })
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/notes/${id}`, credentials)
      reFetch()
      closeModal()
      // dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })
    } catch (err) {
      console.log(err);
      // dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
    }
  }


  return (
    <div className='flex flex-col w-8/10'>
      <div className='flex w-full justify-between mb-5'>
        <header className=' text-2xl'>Tell me what's on your mind</header>
        <button onClick={closeModal}>
          <GiCancel className='text-2xl text-black hover:text-red-400 transition duration-300' />
        </button>
      </div>
      <form >
        <textarea
          type='text'
          cols='10'
          rows='3'
          id='description'
          onChange={handleChange}
          className='px-3
                py-4
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
                w-full
                '
        ></textarea>
        <button onClick={handleClick}>save</button>
      </form>
    </div>
  )
}
export default NewNote
