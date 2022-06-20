import { combineReducers } from "redux";

import NavState from "./NavState";
import UserReducer from "./RoleReducers/user"; 
import IdToBeUpdate from "./IdToBeUpdate"; 
import NavReducer from './NavReducer'


export const reducers = combineReducers({ NavState ,UserReducer , IdToBeUpdate , NavReducer  });
