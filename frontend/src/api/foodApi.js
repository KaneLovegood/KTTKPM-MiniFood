import { apiConfig } from '../config/apiConfig'
import { createHttpClient } from './httpClient'

const client = createHttpClient(apiConfig.foodServiceBaseUrl)
const unwrap = (response) => response.data

export const getFoods = () => client.get('/foods').then(unwrap)
export const createFood = (payload) => client.post('/foods', payload).then(unwrap)
export const updateFood = (id, payload) => client.put(`/foods/${id}`, payload).then(unwrap)
export const deleteFood = (id) => client.delete(`/foods/${id}`).then(unwrap)
