import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { apiClient } from '../api/client'
import { useAuth } from '../context/AuthContext'

const schema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Мінімум 6 символів'),
})
type FormData = z.infer<typeof schema>

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      apiClient.post<{ access_token: string }>('/auth/login', data).then(r => r.data),
    onSuccess: async (data) => {
      await login(data.access_token)
      navigate('/profile')
    },
    onError: (error: any) => {
      // error handled in JSX
    }
  })

  const getErrorMessage = (error: any) => {
    const status = error?.response?.status
    if (status === 401) return 'Невірний email або пароль'
    if (status === 400) return 'Невалідні дані'
    return 'Помилка входу'
  }

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input {...register('email')} type="email" style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          {errors.email && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.email.message}</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Пароль</label>
          <input {...register('password')} type="password" style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          {errors.password && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.password.message}</span>}
        </div>
        {mutation.isError && (
          <p style={{ color: 'red', marginBottom: '1rem' }}>{getErrorMessage(mutation.error)}</p>
        )}
        <button type="submit" disabled={mutation.isPending} style={{ width: '100%', padding: '0.6rem' }}>
          {mutation.isPending ? 'Завантаження...' : 'Увійти'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Немає акаунта? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  )
}