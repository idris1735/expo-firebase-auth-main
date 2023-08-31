// store.js
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer' // Import your cart reducer
import balanceReducer from './balanceReducer' // Import your balance reducer
import orderReducer from './orderReducer'
import tableNumberSlice from './tableNumberSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add cart reducer to your store
    balance: balanceReducer, // Add balance reducer to your store
    order: orderReducer,
    tableNumber: tableNumberSlice,
  },
})

export default store
