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
          <Route path='login' element={<Login />} />
          {/* <Route path='logout' element={<Login />} /> */}
          <Route index element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
