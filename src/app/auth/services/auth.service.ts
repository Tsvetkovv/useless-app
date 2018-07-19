import { Injectable } from '@angular/core';
import {Authenticate, User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {_throw} from 'rxjs/observable/throw';
import {of} from 'rxjs/observable/of';

@Injectable()
export class AuthService {
  constructor() { }

  login({ isValidPassword }: Authenticate): Observable<User> {
    if (isValidPassword) {
      return of({name: 'User'});
    } else {
      return _throw('Invalid password');
    }
  }

  logout() {
    return of(true);
  }
}
