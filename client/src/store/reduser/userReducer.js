const defaultState = {
    fullName: '',
    email: '',
    id: null,
}

export const userReducer = (state = defaultState, action) =>{
    switch (action.type){
        case('SET_USER'):
            return {
                ...state,
                fullName: action.payload,
                email: action.payload,
                id: action.payload,
            }

        default:
            return state
    }
}