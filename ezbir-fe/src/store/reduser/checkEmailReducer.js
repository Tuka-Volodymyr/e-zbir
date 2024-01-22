const defaultState = {
  email: 'Email'
}
export const checkEmailReducer = (state = defaultState, action) => {
  switch (action.type){
    case "SET_EMAIL":
      return {...state, email: action.payload}
    default:
      return state
  }
}