import * as fromRouter from '@ngrx/router-store';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import { RouterStateUrl } from '../shared/types/router.type';
import * as fromLayout from '../core/reducers/layout';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<{}> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
};

/** Layout */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);
