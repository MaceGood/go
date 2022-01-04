import * as types from "../types";

export const search = (
  state = { value: "", results: [] },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case types.SEARCH_VALUE:
      return { ...state, value: action.payload };
    case types.SEARCH_RESULTS:
      return { ...state, results: action.payload };

    default:
      return state;
  }
};
