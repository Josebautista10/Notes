import axios from 'axios'
import { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const { dispatch, user} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleClick = async (e) => {
    dispatch({ type: 'LOGOUT' })
    axios.get('/auth/logout').then(navigate('/login'))
  }

  if (!user) {
    navigate('/login')
  }
  return (
    <div>
      <nav className='bg-burnt-orange flex justify-between text-peach'>
        <div className='ml-4 text-4xl py-1'>Notes</div>
        <div className='mr-4 text-2xl flex items-center justify-evenly w-1/4'>
          <p>Welcome back {user?.username}</p>
          <button onClick={handleClick}>Logout</button>
        </div>
      </nav>
      <div className=''>
        <div>
          <button className='' >New Note</button>
        </div>
      </div>
    </div>
  )
}

export default Home
