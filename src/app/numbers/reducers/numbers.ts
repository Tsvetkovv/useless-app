import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserNumber} from '../models/user-number';
import {NumbersActions, NumbersActionTypes} from '../actions/numbers';

export interface State {
  numbers: UserNumber[];
  numberIdsSinceLastVisit: number[];
  hasLoaded: boolean;
}

const initialState: State = {
  numbers: [],
  numberIdsSinceLastVisit: [],
  hasLoaded: false,
};

export function reducer(
  state: State = initialState,
  action: NumbersActions
): State {
  switch (action.type) {
    case NumbersActionTypes.Submit:
      return {
        ...state,
        numbers: [
          ...state.numbers,
          action.payload,
        ],
      };
    case NumbersActionTypes.LoadSuccess:
      return {
        ...state,
        numbers: action.payload,
        hasLoaded: true,
      };
    default:
      return state;
  }
}

const selectNumbersState = createFeatureSelector<State>('numbers');

export const getNumbers = createSelector(
  selectNumbersState,
  (state: State) => state.numbers
);

export const getHasLoaded = createSelector(
  selectNumbersState,
  (state: State) => state.hasLoaded
);
