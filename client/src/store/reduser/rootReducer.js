import {combineReducers} from "redux";
import {checkEmailReducer} from "./checkEmailReducer";

const rootReducer = combineReducers({
    checkEmail: checkEmailReducer,
})