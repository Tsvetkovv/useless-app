import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<fromAuth.State>) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
