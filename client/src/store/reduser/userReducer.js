const defaultState = {
    username: '',
    email: '',
    id: null,
}

export const userReducer = (state = defaultState, action) =>{
    switch (action.type){
        case('SET_USER'):
            return {
                ...state,
                username: action.payload,
                email: action.payload,
                id: action.payload,
            }

        default:
            return state
    }
}