import { useContext } from 'react'
import Login from './components/AuthPages/Login'
import Register from './components/AuthPages/Register'
import Home from '../src/components/Home'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import ProtectedRoute from './components/AuthPages/ProtectedRoute'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path='home' element={<Home />} />
          </Route>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
