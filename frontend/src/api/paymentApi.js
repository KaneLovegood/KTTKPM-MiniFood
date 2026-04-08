import { apiConfig } from '../config/apiConfig'
import { createHttpClient } from './httpClient'

const client = createHttpClient(apiConfig.paymentServiceBaseUrl)
const unwrap = (response) => response.data

export const createPayment = (payload) => client.post('/payments', payload).then(unwrap)
