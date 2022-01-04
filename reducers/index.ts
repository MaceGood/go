import { combineReducers } from "redux";
import { userInfo } from "./user";
import { search } from "./search";
import { connections } from "./connections/connections";

export const reducers = combineReducers({ userInfo, connections, search });
