import axios from 'axios'
import { useState } from 'react'
import { GiCancel } from 'react-icons/gi'

const NewNote = ({ closeModal, id, reFetch }) => {
  const [credentials, setCredentials] = useState({
    description: ''
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
    } catch (err) {
      console.log(err)
    }
  }

  let count = credentials.description.length
  let maxCharCount = 80
  let minCharCount = 10

  return (
    <div className='flex flex-col text-burnt-orange'>
      <div className='flex w-full justify-between mb-5 '>
      <header className=' text-md sm:text-lg md:text-xl lg:text-2xl text-burnt-orange font-bold'>
          Tell me what's on your mind
        </header>
        <button onClick={closeModal}>
          <GiCancel className='text-2xl lg:text-3xl text-burnt-orange hover:text-black transition duration-300' />
        </button>
      </div>
      <form>
        <textarea
          type='text'
          cols='10'
          rows='3'
          min='10'
          maxLength='80'
          id='description'
          onChange={handleChange}
          placeholder='Today I had an amazing day at the park'
          required
          className='px-3
                py-1
                text-sm
                sm:text-lg
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                mb-4
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                w-full
                h-28
                md:h-20'
        ></textarea>
        <div className='flex flex-col items-end mr-1 font-bold'>
          <p>{maxCharCount - count}</p>
        </div>
        <div className='flex justify-center'>
          <button
            className='bg-burnt-orange text-peach transition duration-300 hover:bg-orange-300 hover:text-burnt-orange font-bold py-1 rounded-full w-4/5 sm:w-3/5 md:w-2/5'
            onClick={handleClick}
          >
            save
          </button>
        </div>
      </form>
    </div>
  )
}
export default NewNote
