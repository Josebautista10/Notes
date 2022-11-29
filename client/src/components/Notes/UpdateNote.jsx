import axios from 'axios'
import { useEffect, useState } from 'react'
import { GiCancel } from 'react-icons/gi'

const UpdateNote = ({ closeModal, id, reFetch, noteId }) => {
  const [description, setDescription] = useState()
  let maxCharCount = 80
  let count = description?.length

  useEffect(() => {
    axios.get(`/notes/${id}/${noteId}`).then((response) => {
      setDescription(response.data.description)
    })
  }, [id, noteId])

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/notes/${id}/${noteId}`, { description })
      reFetch()
      closeModal()
    } catch (err) {
      console.log(err)
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
      <form>
        <textarea
          type='text'
          cols='10'
          rows='3'
          min='10'
          maxLength="80"
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
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
        <p>{maxCharCount - count}</p>
        <button onClick={handleClick}>save</button>
      </form>
    </div>
  )
}
export default UpdateNote
