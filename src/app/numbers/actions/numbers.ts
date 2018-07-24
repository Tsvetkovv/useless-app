import {Action} from '@ngrx/store';
import {UserNumber} from '../models/user-number';

export enum NumbersActionTypes {
  Submit = '[Numbers] Submit',
}

export class Submit implements Action {
  readonly type = NumbersActionTypes.Submit;

  constructor(public payload: UserNumber) {
  }
}

export type NumbersActions = Submit;
