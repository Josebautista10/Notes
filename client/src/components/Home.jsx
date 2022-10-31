import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const { dispatch, user } = useContext(AuthContext)
  const [counter, setCounter] = useState(5)
  console.log(counter)
  const navigate = useNavigate()

  const handleClick = async (e) => {
    dispatch({ type: 'LOGOUT' })
    axios.get('/auth/logout').then(navigate('/login'))
  }

  if (!user) {
    setInterval(() => {
      setCounter(counter - 1)
      if (counter === 0) {
        document.getElementById('login').click()
      }
    }, 1000)
  }

  return user ? (
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
          <button className=''>New Note</button>
        </div>
      </div>
    </div>
  ) : (
    <div className='bg-peach h-screen flex items-center justify-center  flex-col'>
      <p className='text-3xl'>
        Looks like your not signed in!&nbsp;
        <a className='text-burnt-orange' href='/login' id='login'>
          {' '}
          Login
        </a>
      </p>
      <p className='text-xl'>
        {counter < 0
          ? 'redirecting'
          : `You'll be redirected back to login page in ${counter} seconds`}
      </p>
    </div>
  )
}

export default Home
