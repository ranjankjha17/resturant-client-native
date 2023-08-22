import * as orderService from '../services/orderService'
import { createSlice } from '@reduxjs/toolkit'


const initialState = []
const orderSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        setOrders: (state, action) => {
            return action.payload
        },
        addOrder:(state,action)=>{
            state.push(action.payload)
        }
    }
})

export const { setOrders,addOrder } = orderSlice.actions
export default orderSlice.reducer


export const fetchItems = () => async (dispatch) => {
    try {
        const orders = await orderService.getOrders()
        //console.log(orders)
        dispatch(setOrders(orders))

    } catch (error) {
        console.log("Error in fetching orders", error.message)
    }
}

export const addNewOrder = (orderData) => async (dispatch) => {
    try {
      const newOrder = await orderService.createOrder(orderData);
      //console.log(newOrder)
      dispatch(addOrder(newOrder));
    } catch (error) {
      console.log("Error creating order:", error.message);
    }
  };