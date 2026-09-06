import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export function RequireRole({ role, children }) {
  const { role: currentRole, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (role && currentRole !== role) {
    return <Navigate to="/" replace />
  }
  return children
}
