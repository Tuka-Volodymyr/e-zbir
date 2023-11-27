import {combineReducers} from "redux";
import {checkEmailReducer} from "./checkEmailReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
    checkEmail: checkEmailReducer,
    userInfo: userReducer,
})