// salesDataReducer.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const salesDataSlice = createSlice({
  name: 'salesData',
  initialState,
  reducers: {
    setSalesData: (state, action) => {
      return action.payload
    },
    // Add other cases to handle sales data actions (e.g., adding a new sale).
  },
})

export const { setSalesData } = salesDataSlice.actions
export default salesDataSlice.reducer

// Add a selector within the same file to access sales data
export const selectSalesData = (state) => state.salesData
