import Login from '../src/components/Login'
import Register from '../src/components/Register'
import Home from '../src/components/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    // <div className='bg-red-800'>
    //   <Login/>
    //   {/* <Register/> */}
    // </div>
    <Router>
      <div>
        <Routes>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route index element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
