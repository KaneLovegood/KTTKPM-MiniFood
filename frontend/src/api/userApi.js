import { apiConfig } from '../config/apiConfig'
import { createHttpClient } from './httpClient'

const client = createHttpClient(apiConfig.userServiceBaseUrl)
const unwrap = (response) => response.data

export const registerUser = (payload) => client.post('/register', payload).then(unwrap)
export const loginUser = (payload) => client.post('/login', payload).then(unwrap)
export const getUsers = () => client.get('/users').then(unwrap)
