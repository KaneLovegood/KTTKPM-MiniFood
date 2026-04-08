import { apiConfig } from '../config/apiConfig'
import { createHttpClient } from './httpClient'

const client = createHttpClient(apiConfig.foodServiceBaseUrl)
const unwrap = (response) => response.data

export const getFoods = () => client.get('/foods').then(unwrap)
