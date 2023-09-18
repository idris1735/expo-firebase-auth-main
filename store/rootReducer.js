// rootReducer.js
import { combineReducers } from 'redux'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import balanceReducer from './balanceReducer'
import orderReducer from './orderReducer'
import tableNumberSlice from './tableNumberSlice'
import salesDataReducer from './salesDataReducer' // Import your salesDataReducer

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  balance: balanceReducer,
  order: orderReducer,
  tableNumber: tableNumberSlice,
  salesData: salesDataReducer, // Add salesData reducer to your store
})

export default rootReducer
