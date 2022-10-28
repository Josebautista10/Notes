import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const { user } = useContext(AuthContext)

  return (
    <div>
    <nav className="bg-burnt-orange flex justify-between text-peach">
      <div className="ml-4 text-4xl py-1">Notes</div>
      <div className="mr-4 text-2xl flex items-center">Welcome back {user.username}</div>
    </nav>
    <div className="">
      <div><button className="">New Note</button></div>
    </div>
    </div>
  )
}

export default Home
