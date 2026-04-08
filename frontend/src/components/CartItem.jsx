import Button from './common/Button'
import Card from './common/Card'
import { formatCurrencyVnd } from '../utils/formatters'
import '../styles/pages.css'

export default function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <Card>
      <div className="cart-item">
        <div>
          <p className="cart-item__title">{item.name}</p>
          <p className="cart-item__meta">{formatCurrencyVnd(item.price)} / mon</p>
        </div>
        <div className="cart-item__actions">
          <Button variant="secondary" onClick={onDecrease}>
            -
          </Button>
          <span className="cart-item__qty">{item.quantity}</span>
          <Button variant="secondary" onClick={onIncrease}>
            +
          </Button>
          <Button variant="secondary" onClick={onRemove}>
            Xoa
          </Button>
        </div>
      </div>
    </Card>
  )
}
