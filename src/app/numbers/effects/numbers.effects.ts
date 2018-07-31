import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import * as fromNumbers from '../reducers/numbers';
import {LoadSuccess, NumbersActionTypes} from '../actions/numbers';
import {NumbersService} from '../services/numbers.service';
import {UserNumber} from '../models/user-number';

@Injectable()
export class NumbersEffects {
  @Effect()
  loadCollection$ = this.actions$.pipe(
    ofType(NumbersActionTypes.Load),
    withLatestFrom(this.store$.pipe(select(fromNumbers.getHasLoaded))),
    filter(([action, hasLoaded]) => !hasLoaded), // continue if is not loaded
    switchMap(() =>
      this.numbersService.getNumbers().pipe(
        map((numbers: UserNumber[]) => {
            return new LoadSuccess(numbers);
          }
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromNumbers.State>,
    private router: Router,
    private numbersService: NumbersService,
  ) {
  }
}
