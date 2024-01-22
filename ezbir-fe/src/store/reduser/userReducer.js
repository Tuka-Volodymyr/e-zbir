const defaultState = {
    username: '',
    email: '',
    login: window.localStorage.getItem('login'),
    id: null,
}

export const userReducer = (state = defaultState, action) =>{
    switch (action.type){
        case('SET_USER_LOGIN'):
            return {
                ...state,
                login: action.payload,
            }

        default:
            return state
    }
}