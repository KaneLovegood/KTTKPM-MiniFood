import axios from 'axios'

const createHttpClient = (baseURL) =>
  axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

const getApiErrorMessage = (error) => {
  const messageFromApi =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.details
  return messageFromApi || error?.message || 'Request failed'
}

export { createHttpClient, getApiErrorMessage }
