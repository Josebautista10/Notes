import { useContext, useState } from 'react'
import { CgNotes } from 'react-icons/cg'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  })

  const { loading, error, dispatch, user } = useContext(AuthContext)

  const navigate = useNavigate()

  if (user) {
    return <Navigate to={'/home'} replace />
  }

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios.post('/auth/login', credentials)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })
      navigate('/home')
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
    }
  }

  return (
    <div className='flex h-screen w-full'>
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
          <h1 className='text-burnt-orange text-3xl'>Sign in to Notes!</h1>
          <p className='text-xl flex '>
            Don't have an account yet?&nbsp;
            <a className='text-burnt-orange' href='/register'>
              Register Here!
            </a>
          </p>
          <form className=' mt-10'>
            <div className='flex flex-col text-burnt-orange text-2xl'>
              <label>Username:</label>
              <input
                type='text'
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
                id='username'
                onChange={handleChange}
                placeholder='user3000'
                required
              />
            </div>
            <div className='flex flex-col text-burnt-orange text-2xl'>
              <label>Password:</label>
              <input
                type='password'
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
                id='password'
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
              Login
            </button>
          </form>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  )
}

export default Login
