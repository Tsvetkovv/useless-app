import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Authenticate } from '../models/user';
import {AuthActionTypes, Login, LoginFailure, LoginSuccess} from '../actions/auth';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService
        .login(auth)
        .pipe(
          map(user => new LoginSuccess({user})),
          catchError(error => of(new LoginFailure(error)))
        )
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
    tap(() => {
      return this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {
  }
}
