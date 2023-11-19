import {createStore} from "redux";
import {checkEmailReducer} from "./reduser/checkEmailReducer";

export const store = createStore(checkEmailReducer)