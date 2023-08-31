// authenticationReducer.js
const initialState = {
  user: null, // Initialize user as null
  isAuthenticated: false,
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

export default authenticationReducer
