import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import '../styles/components.css'

export default function NotFoundPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
      <EmptyState title="Khong tim thay trang" description="Duong dan khong hop le hoac da bi thay doi." />
      <div style={{ marginTop: '14px', textAlign: 'center' }}>
        <Link to="/foods">
          <Button>Ve trang Foods</Button>
        </Link>
      </div>
      </div>
    </div>
  )
}
