import * as types from "../../types";

export const connections = (
  state = { connections: null },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case types.CONNECTIONS:
      return { ...state, connections: action.payload };

    default:
      return state;
  }
};
