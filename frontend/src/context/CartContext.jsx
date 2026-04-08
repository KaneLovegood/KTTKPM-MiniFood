import { createContext, useContext, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '../utils/storageKeys'
import { getStorageValue, setStorageValue } from '../utils/storage'

const CartContext = createContext(null)

const persistCart = (items) => setStorageValue(STORAGE_KEYS.cartItems, items)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => getStorageValue(STORAGE_KEYS.cartItems, []))

  const addToCart = (food) => {
    setItems((prev) => {
      const existed = prev.find((item) => item.id === food.id)
      const nextItems = existed
        ? prev.map((item) => (item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...prev, { ...food, quantity: 1 }]
      persistCart(nextItems)
      return nextItems
    })
  }

  const increaseQty = (foodId) => {
    setItems((prev) => {
      const nextItems = prev.map((item) =>
        item.id === foodId ? { ...item, quantity: item.quantity + 1 } : item,
      )
      persistCart(nextItems)
      return nextItems
    })
  }

  const decreaseQty = (foodId) => {
    setItems((prev) => {
      const nextItems = prev
        .map((item) => (item.id === foodId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
      persistCart(nextItems)
      return nextItems
    })
  }

  const removeFromCart = (foodId) => {
    setItems((prev) => {
      const nextItems = prev.filter((item) => item.id !== foodId)
      persistCart(nextItems)
      return nextItems
    })
  }

  const clearCart = () => {
    persistCart([])
    setItems([])
  }

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [items],
  )

  const totalQuantity = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const value = useMemo(
    () => ({
      items,
      totalAmount,
      totalQuantity,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
    }),
    [items, totalAmount, totalQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
