import {combineReducers} from "redux";
import {checkEmailReducer} from "./checkEmailReducer";
import {userReducer} from "./userReducer";
import {userIdReducer} from "./userIdReducer";

export const rootReducer = combineReducers({
    checkEmail: checkEmailReducer,
    userInfo: userReducer,
    userId: userIdReducer,
})