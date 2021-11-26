import { combineReducers } from "redux";
import * as types from "../types";

export const user = (state = null, action: { type: any }) => {
  switch (action.type) {
    case types.SET_USER:
      return action;
    case types.LOGOUT:
      return (state = null);
    default:
      return state;
  }
};
