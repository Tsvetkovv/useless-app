import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MaterialModule} from '../material/material.module';
import {reducer} from './reducers/numbers';
import {NumbersComponent} from './containers/numbers/numbers.component';
import {LogComponent} from './components/log/log.component';
import {DialpadComponent} from './components/dialpad/dialpad.component';
import {NumberTableComponent} from './components/number-table/number-table.component';
import {DialpadItemComponent} from './components/dialpad-item/dialpad-item.component';
import {NumbersChartComponent} from './components/numbers-chart/numbers-chart.component';
import {NumbersService} from './services/numbers.service';
import {NumbersEffects} from './effects/numbers.effects';

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
    NumbersChartComponent,
  ],
  providers: [
    NumbersService,
  ]
})
export class NumbersModule {
  static forRoot() {
    return {
      ngModule: RootNumbersModule,
    };
  }
}

@NgModule({
  imports: [
    NumbersModule,
    StoreModule.forFeature('numbers', reducer),
    EffectsModule.forFeature([NumbersEffects])
  ]
})
export class RootNumbersModule {

}
