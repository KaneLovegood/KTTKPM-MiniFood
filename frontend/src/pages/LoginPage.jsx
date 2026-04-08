import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { getApiErrorMessage } from '../api/httpClient'
import '../styles/components.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { showToast } = useToast()

  const [form, setForm] = useState({ username: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await login(form)
      showToast('success', 'Dang nhap thanh cong.')
      navigate('/foods', { replace: true })
    } catch (error) {
      showToast('error', `Dang nhap that bai: ${getApiErrorMessage(error)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-shell">
      <Card className="auth-card">
        <PageHeader title="Dang nhap MiniFood" subtitle="Nhap tai khoan de tiep tuc dat mon." />
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input id="username" name="username" label="Username" value={form.username} onChange={handleChange} required />
          <Input
            id="password"
            type="password"
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Dang xu ly...' : 'Dang nhap'}
          </Button>
        </form>

        <p className="auth-footer">
          Chua co tai khoan?{' '}
          <Link className="auth-link" to="/register">
            Dang ky ngay
          </Link>
        </p>
      </Card>
    </div>
  )
}
