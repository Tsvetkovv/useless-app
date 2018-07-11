import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthModule])
  ]
})
export class RootAuthModule {}
