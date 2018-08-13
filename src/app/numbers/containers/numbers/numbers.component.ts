import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import * as fromNumbers from '../../reducers/numbers';
import * as Numbers from '../../actions/numbers';
import {UserNumber} from '../../models/user-number';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {
  numbers$: Observable<UserNumber[]> = this.store$.pipe(select(fromNumbers.getNumbers));
  topNumbers$: Observable<UserNumber[]> = this.store$.pipe(select(fromNumbers.getTopNumbersPerDay));
  enteredNumbers$ = new Subject<number>();

  constructor(
    private store$: Store<fromNumbers.State>,
  ) {
  }

  ngOnInit() {
    this.store$.dispatch(new Numbers.Load());
  }

  onSubmitNumber(number: number) {
    this.enteredNumbers$.next(number);
    this.store$.dispatch(new Numbers.Submit({
      date: new Date(),
      value: number
    }));
  }
}
