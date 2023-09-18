// userReducer.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  salesData: [], // Initialize salesData as an empty array
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setSalesData: (state, action) => {
      state.salesData = action.payload
    },
  },
})

export const { setUser, setSalesData } = userSlice.actions
export default userSlice.reducer
