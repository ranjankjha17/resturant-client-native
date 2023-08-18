import { configureStore} from '@reduxjs/toolkit'
import orderReducer from '../reducers/order'
import tempOrderReducer from '../reducers/temp_order'
import authSlice from '../reducers/login'
import logger from 'redux-logger'
const rootReducer={
    orders:orderReducer,
    tempOrder:tempOrderReducer,
    auth:authSlice,
}


const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({ serializableCheck: false}).concat(logger),
    devTools: process.env.NODE_ENV !== "production",

})



export default store