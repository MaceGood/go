import { combineReducers } from "redux";
import { userInfo } from "./user";
import { connections } from "./connections/connections";

export const reducers = combineReducers({ userInfo, connections });
