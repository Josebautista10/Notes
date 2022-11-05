import { useContext } from 'react'
import Login from '../src/components/Login'
import Register from '../src/components/Register'
import Home from '../src/components/Home'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

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
