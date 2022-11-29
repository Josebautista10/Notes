import axios from 'axios'
import { useContext, useState } from 'react'
import { CgNotes } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  })
  const { loading, error, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value)
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/auth/register', credentials)
      navigate('/')
    } catch (err) {
      console.log(err.response.data.message)
      dispatch({ type: 'REGISTER_FAILURE', payload: err.response.data })
      console.log(error)
    }
  }

  return (
    <div className='flex h-screen'>
       <div className='bg-burnt-orange lg:w-1/2 hidden lg:block'>
        <header>
          <h1 className='ml-5 mt-5 text-4xl text-peach'>Notes</h1>
        </header>
        <div className='w-full h-4/5 flex flex-col justify-center text-peach items-center justify'>
          <CgNotes className='text-[25rem]' />
          <p className='w-2/3 flex justify-center text-2xl mt-7 items-baseline'>
            A place where all your thoughts can go
          </p>
        </div>
      </div>
      <div className='bg-peach w-full lg:w-1/2 h-full flex justify-center items-center'>
        <div className='w-3/4 h-4/5 flex flex-col '>
          <h1 className='text-burnt-orange text-3xl'>Welcome to Notes! </h1>
          <p className='text-xl flex '>
            Already have an account?&nbsp;
            <a className='text-burnt-orange' href='/'>
              Login!
            </a>
          </p>
          <form className=' mt-10'>
            <div className='flex flex-col text-burnt-orange text-2xl'>
              <label>Username:</label>
              <input
                type='text'
                id='username'
                className='
                form-control
                block
                w-full
                px-3
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
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                placeholder='User300'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col text-burnt-orange text-2xl'>
              <label>Email:</label>
              <input
                type='email'
                id='email'
                className='
                form-control
                block
                w-full
                px-3
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
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                placeholder='example@example.com'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col text-burnt-orange text-2xl'>
              <label>Password:</label>
              <input
                type='password'
                id='password'
                className='
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                placeholder='Password'
                onChange={handleChange}
                required
              />
            </div>
            <button
              className='bg-burnt-orange text-peach px-4 py-2 rounded mt-12 w-full'
              disabled={loading}
              onClick={handleClick}
              type='submit'
            >
              Register
            </button>
          </form>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  )
}

export default Register
