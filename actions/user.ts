import * as types from "../types";

export const setUser = (user: any) => ({ type: types.SET_USER, payload: user });

export const setUsersAccepting = (usersAccepting: any) => ({
  type: types.USERS_ACCEPTING,
  payload: usersAccepting,
});
