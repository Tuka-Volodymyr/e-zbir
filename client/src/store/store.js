import {createStore} from "redux";
import {rootReducer} from "./reduser/rootReducer";

export const store = createStore(rootReducer)