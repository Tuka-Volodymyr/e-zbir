const defaultState = {
    id: null
}
export const userIdReducer = (state = defaultState, action) => {
    switch (action.type){
        case "SET_USER_ID":
            return {...state, id: action.payload}
        default:
            return state
    }
}