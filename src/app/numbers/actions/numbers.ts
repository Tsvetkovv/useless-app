import {Action} from '@ngrx/store';
import {UserNumber} from '../models/user-number';

export enum NumbersActionTypes {
  Submit = '[Numbers] Submit',
  Load = '[Numbers] Load',
  LoadSuccess = '[Numbers] LoadSuccess',
}

export class Submit implements Action {
  readonly type = NumbersActionTypes.Submit;

  constructor(public payload: UserNumber) {
  }
}

export class Load implements Action {
  readonly type = NumbersActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = NumbersActionTypes.LoadSuccess;

  constructor(public payload: UserNumber[]) {
  }
}

export type NumbersActions =
  | Submit
  | Load
  | LoadSuccess;
