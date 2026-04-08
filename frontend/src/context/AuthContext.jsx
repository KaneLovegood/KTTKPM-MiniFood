import { createContext, useContext, useMemo, useState } from 'react'
import { getUsers, loginUser } from '../api/userApi'
import { extractUserFromLogin } from '../utils/normalizers'
import { STORAGE_KEYS } from '../utils/storageKeys'
import { getStorageValue, removeStorageValue, setStorageValue } from '../utils/storage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStorageValue(STORAGE_KEYS.authUser, null))

  const login = async ({ username, password }) => {
    const payload = await loginUser({ username, password })
    const normalizedUser = extractUserFromLogin(payload, username)

    let resolvedUser = normalizedUser
    if (!normalizedUser.id) {
      const usersPayload = await getUsers()
      const users = Array.isArray(usersPayload) ? usersPayload : []
      const matchedUser = users.find((item) => item?.username === normalizedUser.username)
      if (!matchedUser?.id) {
        throw new Error('Khong tim thay userId cho tai khoan dang nhap')
      }
      resolvedUser = {
        ...normalizedUser,
        id: matchedUser.id,
        fullName: normalizedUser.fullName || matchedUser.fullName || '',
        role: normalizedUser.role || matchedUser.role || 'USER',
      }
    }

    setUser(resolvedUser)
    setStorageValue(STORAGE_KEYS.authUser, resolvedUser)
    return resolvedUser
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
