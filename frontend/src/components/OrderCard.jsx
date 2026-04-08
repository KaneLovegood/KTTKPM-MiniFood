import Card from './common/Card'
import StatusBadge from './StatusBadge'
import { formatCurrencyVnd, formatDateTime } from '../utils/formatters'
import '../styles/pages.css'

export default function OrderCard({ order }) {
  return (
    <Card>
      <div className="order-card__head">
        <div>
          <p className="order-card__label">Ma don</p>
          <p className="order-card__value">#{order.id}</p>
        </div>
        <div>
          <p className="order-card__label">Trang thai</p>
          <StatusBadge status={order.status} />
        </div>
        <div>
          <p className="order-card__label">Tong tien</p>
          <p className="order-card__value">{formatCurrencyVnd(order.totalAmount)}</p>
        </div>
        <div>
          <p className="order-card__label">Thoi gian tao</p>
          <p className="order-card__value">{formatDateTime(order.createdAt)}</p>
        </div>
      </div>

      <div className="order-card__items">
        <p className="order-card__items-title">Danh sach mon</p>
        {order.items.length > 0 ? (
          order.items.map((item, index) => (
            <p key={`${order.id}-${index}`} className="order-card__item-line">
              - Food #{item.foodId ?? item.id}: x{item.quantity ?? 1}
            </p>
          ))
        ) : (
          <p className="order-card__item-line">Order service khong tra ve chi tiet mon.</p>
        )}
      </div>
    </Card>
  )
}
