import Login from '../src/components/Login'
import Register from '../src/components/Register'
import Home from '../src/components/Home'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='register' element={<Register />} />
          <Route path='home' element={<Home />} />
          <Route index element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
