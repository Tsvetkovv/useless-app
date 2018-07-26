import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import * as fromNumbers from '../../reducers/numbers';
import * as Numbers from '../../actions/numbers';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent {
  numbers$ = this.store.pipe(select(fromNumbers.getNumbers));
  enteredNumbers$ = new Subject<number>();

  constructor(private store: Store<fromNumbers.State>) {
  }

  onSubmitNumber(number: number) {
    this.enteredNumbers$.next(number);
    this.store.dispatch(new Numbers.Submit({
      date: new Date(),
      value: number
    }));
  }
}
