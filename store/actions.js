// // actions.js

// import { createAction } from '@reduxjs/toolkit'
// import { ref, get } from 'firebase/database'
// import { database } from '../config/firebase'

// export const setSalesData = createAction('user/setSalesData')

// export const fetchSalesData = (uid) => async (dispatch) => {
//   try {
//     const salesDataRef = ref(database, `users/${uid}/salesData`)
//     const salesDataSnapshot = await get(salesDataRef)
//     const salesData = []

//     salesDataSnapshot.forEach((childSnapshot) => {
//       const orderData = childSnapshot.val()
//       salesData.push(orderData)
//     })

//     // Update salesData in the Redux store
//     dispatch(setSalesData(salesData))
//   } catch (error) {
//     console.error('Error fetching salesData:', error)
//   }
// }
