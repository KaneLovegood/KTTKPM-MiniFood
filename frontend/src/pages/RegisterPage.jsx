import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/userApi'
import { getApiErrorMessage } from '../api/httpClient'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import PageHeader from '../components/PageHeader'
import { useToast } from '../context/ToastContext'
import '../styles/components.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await registerUser({
        username: form.username,
        password: form.password,
      })
      showToast('success', 'Dang ky thanh cong. Vui long dang nhap.')
      navigate('/login', { replace: true })
    } catch (error) {
      showToast('error', `Dang ky that bai: ${getApiErrorMessage(error)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-shell">
      <Card className="auth-card">
        <PageHeader title="Dang ky tai khoan" subtitle="Tao tai khoan nhan vien de dat mon noi bo." />
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input id="fullName" name="fullName" label="Ho va ten" value={form.fullName} onChange={handleChange} required />
          <Input id="username" name="username" label="Username" value={form.username} onChange={handleChange} required />
          <Input
            id="password"
            type="password"
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Dang xu ly...' : 'Dang ky'}
          </Button>
        </form>

        <p className="auth-footer">
          Da co tai khoan?{' '}
          <Link className="auth-link" to="/login">
            Quay lai dang nhap
          </Link>
        </p>
      </Card>
    </div>
  )
}
