import { apiConfig } from '../config/apiConfig'
import { createHttpClient } from './httpClient'

const client = createHttpClient(apiConfig.orderServiceBaseUrl)
const unwrap = (response) => response.data

export const createOrder = (payload) => client.post('/orders', payload).then(unwrap)
export const getOrders = () => client.get('/orders').then(unwrap)
