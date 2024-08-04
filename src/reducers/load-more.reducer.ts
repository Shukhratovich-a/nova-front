import { Reducer } from "react";

export type LoadMoreActions<T> = { type: "load" } | { type: "reset"; initialState: T[] };

export interface LoadMoreReducerState<T> {
  limit: number;
  allItems: T[];
  limitedItems: T[];
}

export interface ILoadMoreReducer<T> extends Reducer<LoadMoreReducerState<T>, LoadMoreActions<T>> {}

export const loadMoreReducer = <T>(
  state: LoadMoreReducerState<T>,
  action: LoadMoreActions<T>
): LoadMoreReducerState<T> => {
  switch (action.type) {
    case "load":
      return {
        ...state,
        limitedItems: state.allItems.slice(0, state.limit + 10),
        limit: state.limit + 10,
      };
    case "reset": {
      return {
        ...state,
        allItems: action.initialState,
        limitedItems: action.initialState.slice(0, 10),
        limit: 10,
      };
    }
    default:
      throw new Error("Неверный тип сортировки");
  }
};
