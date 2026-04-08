export const getStorageValue = (key, fallbackValue) => {
  try {
    const rawValue = localStorage.getItem(key)
    if (!rawValue) {
      return fallbackValue
    }
    return JSON.parse(rawValue)
  } catch {
    return fallbackValue
  }
}

export const setStorageValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorageValue = (key) => {
  localStorage.removeItem(key)
}
