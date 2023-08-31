import { createSlice } from '@reduxjs/toolkit'

const tableNumberSlice = createSlice({
  name: 'tableNumber',
  initialState: null,
  reducers: {
    setTableNumber: (state, action) => {
      return action.payload // Set the table number in the state
    },
  },
})

export const { setTableNumber } = tableNumberSlice.actions

// Create a selector to select the table number from the state
export const selectTableNumber = (state) => state.tableNumber

export default tableNumberSlice.reducer
