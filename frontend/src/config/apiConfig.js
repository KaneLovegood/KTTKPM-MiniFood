const getEnvValue = (key, fallback) => {
  const value = import.meta.env[key]
  return value && value.trim().length > 0 ? value.trim() : fallback
}

export const apiConfig = {
  userServiceBaseUrl: getEnvValue('VITE_USER_SERVICE_URL', 'http://192.168.1.10:8081'),
  foodServiceBaseUrl: getEnvValue('VITE_FOOD_SERVICE_URL', 'http://192.168.1.11:8082'),
  orderServiceBaseUrl: getEnvValue('VITE_ORDER_SERVICE_URL', 'http://192.168.1.12:8083'),
  paymentServiceBaseUrl: getEnvValue('VITE_PAYMENT_SERVICE_URL', 'http://192.168.1.13:8084'),
}
