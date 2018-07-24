import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromNumbers from '../../reducers/numbers';
import * as Numbers from '../../actions/numbers';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent {
  lastEnteredNumber: number;

  constructor(private store: Store<fromNumbers.State>) {
  }

  onSubmitNumber(number: number) {
    this.lastEnteredNumber = number;
    this.store.dispatch(new Numbers.Submit({
      date: new Date(),
      value: number
    }));
  }
}
