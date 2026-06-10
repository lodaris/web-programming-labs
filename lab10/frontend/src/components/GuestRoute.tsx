import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function GuestRoute() {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div>Loading...</div>
  return !user ? <Outlet /> : <Navigate to="/profile" replace />
}