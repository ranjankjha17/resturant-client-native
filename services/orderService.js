import axios from 'axios'
import { loginFailure } from '../reducers/login'

const BASE_URL = 'https://resturant-server-mssql.vercel.app'
//const BASE_URL = 'http://localhost:5000'

export const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/allProducts`)
    return response.data
  } catch (e) {
    console.log(e.message)
  }
}


export const createOrder = async (orderData, dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/order`, orderData)
    return response.data;
  } catch (e) {
    // throw new Error('Error in save data')
    dispatch(loginFailure('Your data is not saved'))
    console.log(e.message)
  }
};

export const getDate = async () => {
  const timeoutDuration = 10000;
  try {
    let response = await axios.get(`${BASE_URL}/api/date`, { timeout: timeoutDuration })
    return response.data

  } catch (e) {
    console.log(e.message)

  }
}
export const getTable = async () => {
  try {
    let response = await axios.get(`${BASE_URL}/api/table`)
    return response.data

  } catch (e) {
    console.log(e.message)

  }
}

