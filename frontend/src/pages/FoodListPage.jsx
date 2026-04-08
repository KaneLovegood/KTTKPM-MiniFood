import { useEffect, useState } from 'react'
import { getFoods } from '../api/foodApi'
import { getApiErrorMessage } from '../api/httpClient'
import FoodCard from '../components/FoodCard'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import Loading from '../components/common/Loading'
import PageHeader from '../components/PageHeader'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { ensureArray, normalizeFood } from '../utils/normalizers'
import '../styles/pages.css'

export default function FoodListPage() {
  const [foods, setFoods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const { addToCart } = useCart()
  const { showToast } = useToast()

  const loadFoods = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const payload = await getFoods()
      setFoods(ensureArray(payload).map(normalizeFood).filter((food) => food.id !== undefined))
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadFoods()
  }, [])

  const handleAddToCart = (food) => {
    addToCart(food)
    showToast('success', `Da them "${food.name}" vao gio hang.`)
  }

  return (
    <section>
      <div className="food-toolbar">
        <PageHeader title="Danh sach mon an" subtitle="Chon mon va them vao gio hang de tao don." />
        <Button variant="secondary" onClick={loadFoods} disabled={isLoading}>
          {isLoading ? 'Dang tai...' : 'Tai lai'}
        </Button>
      </div>

      {isLoading ? <Loading text="Dang tai danh sach mon..." /> : null}
      {!isLoading && errorMessage ? (
        <EmptyState title="Khong the tai mon an" description={`Chi tiet: ${errorMessage}`} />
      ) : null}
      {!isLoading && !errorMessage && foods.length === 0 ? (
        <EmptyState title="Chua co mon an" description="Food service chua seed du lieu hoac tra ve rong." />
      ) : null}

      {!isLoading && !errorMessage && foods.length > 0 ? (
        <div className="food-grid">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
