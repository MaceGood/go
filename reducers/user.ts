import * as types from "../types";

export const userInfo = (
  state = { user: null, usersAccepting: null },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, user: action.payload };
    case types.USERS_ACCEPTING:
      return { ...state, usersAccepting: action.payload };
    case types.LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};
