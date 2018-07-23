import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {LogComponent} from './containers/log/log.component';
import {EnteringSectionComponent} from './containers/entering-section/entering-section.component';
import {NumbersComponent} from './containers/numbers/numbers.component';
import {DialpadComponent} from './components/dialpad/dialpad.component';
import {NumberTableComponent} from './components/number-table/number-table.component';
import {AllValuesComponent} from './containers/all-values/all-values.component';
import {DialpadItemComponent} from './components/dialpad-item/dialpad-item.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LogComponent,
    EnteringSectionComponent,
    NumbersComponent,
    DialpadComponent,
    NumberTableComponent,
    AllValuesComponent,
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
    // StoreModule.forFeature('numbers', reducers),

  ]
})
export class RootNumbersModule {

}
