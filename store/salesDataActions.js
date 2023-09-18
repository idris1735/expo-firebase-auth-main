// salesDataActions.js
import { ref, get } from 'firebase/database'
import { setSalesData } from './salesDataReducer'

export const fetchSalesData = (uid) => async (dispatch) => {
  try {
    // Fetch sales data from Firebase
    const salesDataRef = ref(database, `users/${uid}/salesData`)
    const salesDataSnapshot = await get(salesDataRef)
    const salesData = []

    salesDataSnapshot.forEach((childSnapshot) => {
      const orderData = childSnapshot.val()
      salesData.push(orderData)
    })

    // Update salesData in the Redux store using the setSalesData action
    dispatch(setSalesData(salesData))
  } catch (error) {
    console.error('Error fetching salesData:', error)
  }
}
