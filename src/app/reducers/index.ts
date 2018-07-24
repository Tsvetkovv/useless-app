import * as fromRouter from '@ngrx/router-store';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterStateUrl} from '../shared/types/router.type';
import * as fromLayout from '../core/reducers/layout';
import * as fromNumbers from '../numbers/reducers/numbers';

export interface State {
  layout: fromLayout.State;
  numbers: fromNumbers.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<{}> = {
  layout: fromLayout.reducer,
  numbers: fromNumbers.reducer,
  router: fromRouter.routerReducer,
};

/** Layout */
export const getLayoutState = createFeatureSelector<fromLayout.State>(
  'layout'
);

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);

/** Numbers */
export const getNumbersState = createFeatureSelector<fromNumbers.State>(
  'numbers'
);
