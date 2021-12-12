import * as types from "../../types";

export const setConnections = (connections: any) => ({
  type: types.CONNECTIONS,
  payload: connections,
});
