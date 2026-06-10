import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { apiClient } from '../api/client'

const schema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Мінімум 6 символів'),
})
type FormData = z.infer<typeof schema>

export function RegisterPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data: FormData) => apiClient.post('auth/register', data).then(r => r.data),
    onSuccess: () => navigate('/login'),
  })

  const getMsg = (e: any) => {
    const s = e?.response?.status
    if (s === 409) return 'Користувач з таким email вже існує'
    if (s === 400) return 'Невалідні дані'
    return 'Помилка реєстрації'
  }

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit(d => mutation.mutate(d))}>
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
        {mutation.isError && <p style={{ color: 'red', marginBottom: '1rem' }}>{getMsg(mutation.error)}</p>}
        <button type="submit" disabled={mutation.isPending} style={{ width: '100%', padding: '0.6rem' }}>
          {mutation.isPending ? 'Завантаження...' : 'Зареєструватися'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>Вже є акаунт? <Link to="/login">Увійти</Link></p>
    </div>
  )
}
