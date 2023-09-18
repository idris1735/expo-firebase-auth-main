// // balanceReducer.js

// // Define the initial state with a default balance of $50,000
// const initialState = {
//   balance: 50000,
// }

// // Define your balance reducer
// const balanceReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_BALANCE':
//       return { ...state, balance: action.payload }
//     case 'UPDATE_BALANCE': // Define the 'UPDATE_BALANCE' action type
//       return { ...state, balance: action.payload }
//     default:
//       return state
//   }
// }

// export const selectBalance = (state) => state.balance.balance

// // Define action creators
// export const setBalance = (balance) => ({
//   type: 'SET_BALANCE',
//   payload: balance,
// })

// export const updateBalance = (newBalance) => ({
//   type: 'UPDATE_BALANCE', // Use the correct action type here
//   payload: newBalance,
// })

// // export const selectBalance = (state) => state.balance.balance

// export default balanceReducer
