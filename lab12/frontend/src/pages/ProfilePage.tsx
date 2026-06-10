import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../api/client'
import { useAuth, User } from '../context/AuthContext'

export function ProfilePage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => apiClient.get<User>('auth/me').then(r => r.data),
  })
  const handleLogout = () => { logout(); navigate('/login') }
  if (isLoading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Завантаження...</div>
  return (
    <div style={{ maxWidth: 500, margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Профіль</h2>
      {data && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr><td style={{ padding: '0.5rem', fontWeight: 'bold', width: '40%' }}>ID:</td><td style={{ padding: '0.5rem' }}>{data.id}</td></tr>
            <tr style={{ backgroundColor: '#f9f9f9' }}><td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Email:</td><td style={{ padding: '0.5rem' }}>{data.email}</td></tr>
            <tr><td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Дата реєстрації:</td><td style={{ padding: '0.5rem' }}>{new Date(data.createdAt).toLocaleDateString('uk-UA')}</td></tr>
          </tbody>
        </table>
      )}
      <button onClick={handleLogout} style={{ marginTop: '1.5rem', padding: '0.6rem 1.5rem' }}>Вийти</button>
    </div>
  )
}
