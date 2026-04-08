import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Button from './common/Button'
import '../styles/layout.css'

const navClassName = ({ isActive }) =>
  `app-navbar__link ${isActive ? 'app-navbar__link--active' : ''}`.trim()

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalQuantity, clearCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    clearCart()
    showToast('info', 'Da dang xuat.')
    navigate('/login', { replace: true })
  }

  return (
    <header className="app-navbar">
      <div className="app-navbar__inner">
        <Link to="/foods" className="app-navbar__brand">
          MiniFood Internal
        </Link>
        <nav className="app-navbar__menu">
          <NavLink to="/foods" className={navClassName}>
            Foods
          </NavLink>
          <NavLink to="/cart" className={navClassName}>
            Cart ({totalQuantity})
          </NavLink>
          <NavLink to="/orders" className={navClassName}>
            Orders
          </NavLink>
        </nav>
        <div className="app-navbar__user">
          <div className="app-navbar__user-meta">
            <p className="app-navbar__user-name">{user?.fullName || user?.username}</p>
            <p className="app-navbar__user-role">{user?.role}</p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
