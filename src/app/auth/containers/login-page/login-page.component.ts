import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as Auth from '../../actions/auth';
import {Authenticate} from '../../models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {
  }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Auth.Login($event));
  }
}
