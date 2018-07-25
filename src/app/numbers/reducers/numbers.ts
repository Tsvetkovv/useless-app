import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserNumber} from '../models/user-number';
import {NumbersActions, NumbersActionTypes} from '../actions/numbers';

export interface State {
  numbers: UserNumber[];
  numberIdsSinceLastVisit: number[];
}

const initialState: State = {
  numbers: [],
  numberIdsSinceLastVisit: [],
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
    default:
      return state;
  }
}

const selectNumbersState = createFeatureSelector<State>('numbers');

export const getNumbers = createSelector(
  selectNumbersState,
  (state: State) => state.numbers
);
