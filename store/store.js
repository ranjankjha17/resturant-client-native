import { configureStore} from '@reduxjs/toolkit'
import orderReducer from '../reducers/order'
import logger from 'redux-logger'
const rootReducer={
    orders:orderReducer,
   
}


const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",

})



export default store