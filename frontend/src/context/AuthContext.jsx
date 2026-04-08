import { createContext, useContext, useMemo, useState } from 'react'
import { loginUser } from '../api/userApi'
import { extractUserFromLogin } from '../utils/normalizers'
import { STORAGE_KEYS } from '../utils/storageKeys'
import { getStorageValue, removeStorageValue, setStorageValue } from '../utils/storage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStorageValue(STORAGE_KEYS.authUser, null))

  const login = async ({ username, password }) => {
    const payload = await loginUser({ username, password })
    const normalizedUser = extractUserFromLogin(payload, username)
    setUser(normalizedUser)
    setStorageValue(STORAGE_KEYS.authUser, normalizedUser)
    return normalizedUser
  }

  const logout = () => {
    setUser(null)
    removeStorageValue(STORAGE_KEYS.authUser)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
