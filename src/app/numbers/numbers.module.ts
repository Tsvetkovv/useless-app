import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {LogTableComponent} from './components/log-table/log-table.component';
import {LogComponent} from './containers/log/log.component';
import {EnteringSectionComponent} from './containers/entering-section/entering-section.component';
import {NumbersComponent} from './containers/numbers/numbers.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LogTableComponent,
    LogComponent,
    EnteringSectionComponent,
    NumbersComponent,
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
