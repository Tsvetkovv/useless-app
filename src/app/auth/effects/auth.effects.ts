import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Authenticate } from '../models/user';
import { AuthActionTypes, Login } from '../actions/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: Authenticate) =>
      of(auth.isValidPassword) // service call
    )
  );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect , AuthActionTypes.Logout),
    tap(() => this.router.navigate(['/login']))
  );

  constructor(
    private actions$: Actions,
    private router: Router
  ) {
  }
}
