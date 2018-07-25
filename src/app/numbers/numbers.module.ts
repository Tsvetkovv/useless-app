import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {MaterialModule} from '../material/material.module';
import {reducer} from './reducers/numbers';
import {NumbersComponent} from './containers/numbers/numbers.component';
import {LogComponent} from './components/log/log.component';
import {DialpadComponent} from './components/dialpad/dialpad.component';
import {NumberTableComponent} from './components/number-table/number-table.component';
import {DialpadItemComponent} from './components/dialpad-item/dialpad-item.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LogComponent,
    NumbersComponent,
    DialpadComponent,
    NumberTableComponent,
    DialpadItemComponent,
  ]
})
export class NumbersModule {
  static forRoot() {
    return {
      ngModule: NumbersModule,
    };
  }
}

@NgModule({
  imports: [
    NumbersModule,
    StoreModule.forFeature('numbers', reducer),
  ]
})
export class RootNumbersModule {

}
