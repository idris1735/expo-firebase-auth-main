// Define an initial state with an empty array for orders
const initialState = {
  orders: [],
}

// Modify your action creator to add an order to the existing array
export const setOrderData = (orderData) => ({
  type: 'SET_ORDER_DATA',
  payload: orderData,
})

// Update the reducer to accumulate orders
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDER_DATA':
      // Create a new state object that includes the new order in the orders array
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }
    default:
      return state
  }
}

export default orderReducer
