import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import EmptyState from '../components/common/EmptyState'
import CartItem from '../components/CartItem'
import PageHeader from '../components/PageHeader'
import { useCart } from '../context/CartContext'
import { formatCurrencyVnd } from '../utils/formatters'
import '../styles/pages.css'

export default function CartPage() {
  const { items, totalAmount, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <EmptyState title="Gio hang dang rong" description="Hay chon mon o trang Foods de bat dau dat hang." />
    )
  }

  return (
    <section>
      <PageHeader title="Gio hang" subtitle="Cap nhat so luong va kiem tra tong tien truoc khi checkout." />

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onDecrease={() => decreaseQty(item.id)}
              onIncrease={() => increaseQty(item.id)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>

        <Card className="summary-box">
          <div className="summary-row">
            <p className="summary-row__label">Tong tien</p>
            <p className="summary-row__value">{formatCurrencyVnd(totalAmount)}</p>
          </div>
          <Link to="/checkout">
            <Button fullWidth>Chuyen sang checkout</Button>
          </Link>
          <Button variant="secondary" fullWidth onClick={clearCart}>
            Xoa toan bo gio hang
          </Button>
        </Card>
      </div>
    </section>
  )
}
