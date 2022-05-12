import { combineReducers } from "redux";

import NavState from "./NavState";
import user from "./Role/user.js"

export const reducers = combineReducers({ NavState , user });
