import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {reducers} from './reducers';
import {LoginPageComponent} from './containers/login-page/login-page.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthEffects} from './effects/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [LoginPageComponent, LoginFormComponent],
  exports: [LoginPageComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuardService]
    };
  }
}

const routes = [
  {path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class RootAuthModule {
}
