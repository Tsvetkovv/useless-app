import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './core/containers/app/app.component';

import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {NumbersModule} from './numbers/numbers.module';

import {reducers} from './reducers';
import {environment} from '../environments/environment';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      name: 'Useless app DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    NumbersModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
