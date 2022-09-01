import { combineReducers } from "redux";
import {toDoReducer} from './toDoReducer'


export let rootReducer_toDo=combineReducers({
    toDoReducer,
})