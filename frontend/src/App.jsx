import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Toast from './components/common/Toast'
import MainLayout from './layouts/MainLayout'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import FoodListPage from './pages/FoodListPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import OrdersPage from './pages/OrdersPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  return (
    <>
      <Toast />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/foods" element={<FoodListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/foods" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
