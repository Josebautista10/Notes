import axios from 'axios'

const DeleteNote = ({ id, noteId, reFetch, closeModal }) => {
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`notes/${id}/${noteId}`)
      reFetch()
      closeModal()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='flex items-center w-full justify-center h-full flex-col text-white'>
      <p className='text-md sm:text-xl'>Are you sure you want to delete this note?</p>
      <div className='w-3/4 sm:w-1/2 flex justify-evenly mt-4 text-xl sm:text-2xl font-bold'>
        <form>
          <button onClick={handleClick}>
            <p>Yes</p>
          </button>
        </form>
        <button onClick={() => closeModal()}>
          <p>No</p>
        </button>
      </div>
    </div>
  )
}

export default DeleteNote
