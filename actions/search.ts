import * as types from "../types";

export const setSearchValue = (value: string) => ({
  type: types.SEARCH_VALUE,
  payload: value,
});

export const setSearchResults = (results: any) => ({
  type: types.SEARCH_RESULTS,
  payload: results,
});
