import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../api/orderApi'
import { createPayment } from '../api/paymentApi'
import { getApiErrorMessage } from '../api/httpClient'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import EmptyState from '../components/common/EmptyState'
import Select from '../components/common/Select'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatCurrencyVnd } from '../utils/formatters'
import '../styles/pages.css'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, totalAmount, clearCart } = useCart()
  const { showToast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const orderItemsPayload = useMemo(
    () =>
      items.map((item) => ({
        foodId: item.id,
        quantity: item.quantity,
      })),
    [items],
  )

  if (items.length === 0) {
    return (
      <EmptyState
        title="Khong the checkout khi gio hang rong"
        description="Quay lai trang Foods de them mon vao gio."
      />
    )
  }

  const handleCheckout = async () => {
    setIsSubmitting(true)
    try {
      const createdOrder = await createOrder({
        userId: user?.id,
        items: orderItemsPayload,
      })
      const orderId = createdOrder?.id ?? createdOrder?.orderId
      if (!orderId) {
        throw new Error('Order service did not return orderId')
      }

      await createPayment({
        orderId,
        method: paymentMethod,
      })

      clearCart()
      showToast('success', `Thanh toan thanh cong don #${orderId}.`)
      navigate('/orders', { replace: true })
    } catch (error) {
      showToast('error', `Checkout that bai: ${getApiErrorMessage(error)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <PageHeader title="Checkout" subtitle="Xac nhan don hang va thanh toan COD/Banking." />

      <div className="checkout-layout">
        <Card className="checkout-items">
          {items.map((item) => (
            <div key={item.id} className="checkout-item">
              <div>
                <p className="cart-item__title">{item.name}</p>
                <p className="cart-item__meta">x{item.quantity}</p>
              </div>
              <p className="cart-item__title">{formatCurrencyVnd(item.price * item.quantity)}</p>
            </div>
          ))}
        </Card>

        <Card className="summary-box">
          <div>
            <p className="summary-row__label">Nguoi dat</p>
            <p className="cart-item__title">{user?.fullName || user?.username}</p>
          </div>
          <Select
            id="paymentMethod"
            label="Phuong thuc thanh toan"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
              <option value="COD">COD</option>
              <option value="BANKING">Banking</option>
          </Select>
          <div className="summary-row">
            <p className="summary-row__label">Tong thanh toan</p>
            <p className="summary-row__value">{formatCurrencyVnd(totalAmount)}</p>
          </div>
          <Button fullWidth onClick={handleCheckout} disabled={isSubmitting}>
            {isSubmitting ? 'Dang xu ly...' : 'Xac nhan va thanh toan'}
          </Button>
        </Card>
      </div>
    </section>
  )
}
