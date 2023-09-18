import { createSlice } from '@reduxjs/toolkit'

// ... other code ...

export const fetchSalesData = () => async (dispatch, getState) => {
  try {
    const user = getState().user.user
    if (user) {
      const uid = user.uid
      const salesDataRef = ref(database, `users/${uid}/salesData`)
      const salesDataSnapshot = await get(salesDataRef)
      const salesData = []

      salesDataSnapshot.forEach((childSnapshot) => {
        const orderData = childSnapshot.val()
        salesData.push(orderData)
      })

      // Update salesData in the Redux store
      dispatch(setSalesData(salesData))
    }
  } catch (error) {
    console.error('Error fetching salesData:', error)
  }
}
