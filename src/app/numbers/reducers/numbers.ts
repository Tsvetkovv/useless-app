import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as d3 from 'd3';
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
  (state: State) => state.numbers.sort((a, b) => a.date.getDate() - b.date.getDate())
);

export const getTopNumbersPerDay = createSelector(
  getNumbers,
  (numbers) => {
    return d3.nest<UserNumber, number>()
    // rounding to day
      .key((d: UserNumber) => new Date(d.date).setHours(0, 0, 0, 0).toString())
      .key((d: UserNumber) => d.value.toString())
      .rollup((values) => values.length)
      .entries(numbers)
      .map((item: { key: string, values: { key: string, value: number }[] }) => {
        // get lower value if frequents are equal
        const sortedByFreq = item.values.sort((a, b) => b.value - a.value || +a.key - +b.key);

        return {
          // day
          date: new Date(+item.key),
          // most frequent number for this day
          value: +sortedByFreq[0].key
        };
      });
  }
);

export const getHasLoaded = createSelector(
  selectNumbersState,
  (state: State) => state.hasLoaded
);
