import axios from 'axios'

const BASE_URL='https://resturant-server-sigma.vercel.app'
// const BASE_URL = 'http://localhost:5000'

export const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allOrders`)
    return response.data

  } catch (error) {
    throw new Error('Error getting order list')
  }
}


export const createOrder = async (orderData) => {
 // console.log("orderdata",orderData)
  try {

    const response = await axios.post(`${BASE_URL}/order`,orderData)
    return response.data;

  } catch (error) {
    throw new Error('Error in save data')
  }

};