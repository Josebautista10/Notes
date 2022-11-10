import { Navigate, Outlet } from 'react-router-dom'

// console.log(window.location.pathname)
const ProtectedRoute = ({ user, redirectPath = '/', children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }
  return children ? children : <Outlet />
}

export default ProtectedRoute
