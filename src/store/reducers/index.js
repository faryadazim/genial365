import { combineReducers } from "redux";

import NavState from "./NavState";
import UserReducer from "./RoleReducers/user"; 


export const reducers = combineReducers({ NavState ,UserReducer });
