import { useEffect, useMemo, useState } from 'react'
import { getOrders } from '../api/orderApi'
import { getApiErrorMessage } from '../api/httpClient'
import EmptyState from '../components/common/EmptyState'
import Loading from '../components/common/Loading'
import OrderCard from '../components/OrderCard'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { ensureArray, normalizeOrder } from '../utils/normalizers'
import '../styles/pages.css'

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true)
      setErrorMessage('')
      try {
        const payload = await getOrders()
        setOrders(ensureArray(payload).map(normalizeOrder).filter((order) => order.id !== undefined))
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  const userOrders = useMemo(
    () => orders.filter((order) => String(order.userId) === String(user?.id)),
    [orders, user?.id],
  )

  return (
    <section>
      <PageHeader title="Don hang cua toi" subtitle="Theo doi trang thai va thong tin don da tao." />

      {isLoading ? <Loading text="Dang tai danh sach don..." /> : null}
      {!isLoading && errorMessage ? (
        <EmptyState title="Khong the tai don hang" description={`Chi tiet: ${errorMessage}`} />
      ) : null}
      {!isLoading && !errorMessage && userOrders.length === 0 ? (
        <EmptyState title="Ban chua co don nao" description="Hay tao don o trang Checkout." />
      ) : null}

      {!isLoading && !errorMessage && userOrders.length > 0 ? (
        <div className="orders-list">
          {userOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
