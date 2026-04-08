import Button from './common/Button'
import Card from './common/Card'
import { formatCurrencyVnd } from '../utils/formatters'
import StatusBadge from './StatusBadge'
import '../styles/pages.css'

export default function FoodCard({ food, onAddToCart }) {
  return (
    <Card className="food-card">
      <div className="food-card__image" />
      <div>
        <div className="food-card__header">
          <h3 className="food-card__name">{food.name}</h3>
          <StatusBadge status={food.available ? 'AVAILABLE' : 'UNAVAILABLE'} />
        </div>
        <p className="food-card__description">{food.description || 'Khong co mo ta'}</p>
      </div>
      <div className="food-card__footer">
        <p className="food-card__price">{formatCurrencyVnd(food.price)}</p>
        <Button onClick={() => onAddToCart(food)} disabled={!food.available}>
          Them vao gio
        </Button>
      </div>
    </Card>
  )
}
