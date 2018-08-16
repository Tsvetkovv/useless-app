import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {withLatestFrom} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {UserNumber} from '../../models/user-number';
import * as Numbers from '../../actions/numbers';
import * as fromNumbers from '../../reducers/numbers';
import {NumbersChartComponent} from '../../components/numbers-chart/numbers-chart.component';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit, OnDestroy {
  @ViewChild(NumbersChartComponent) chart: NumbersChartComponent;
  numbers$: Observable<UserNumber[]> = this.store$.pipe(select(fromNumbers.getNumbers));
  topNumbers$: Observable<UserNumber[]> = this.store$.pipe(select(fromNumbers.getTopNumbersPerDay));
  enteredNumbers$ = new Subject<number>();
  onAnimationDone$: Subject<void> = new Subject<void>();
  onChangeTab$: Subject<MatTabChangeEvent> = new Subject<MatTabChangeEvent>();
  onInitTab$: Observable<MatTabChangeEvent> = this.onAnimationDone$.asObservable().pipe(
    withLatestFrom(this.onChangeTab$, (animVal, tabVal) => tabVal)
  );
  sub: Subscription;

  constructor(
    private store$: Store<fromNumbers.State>,
  ) {
  }

  ngOnInit() {
    this.store$.dispatch(new Numbers.Load());
    this.sub = this.onInitTab$.subscribe(() => this.chart.animate());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmitNumber(number: number) {
    this.enteredNumbers$.next(number);
    this.store$.dispatch(new Numbers.Submit({
      date: new Date(),
      value: number
    }));
  }

  onChangeTab(e: MatTabChangeEvent) {
    this.onChangeTab$.next(e);
  }

  onAnimationDone() {
    this.onAnimationDone$.next();
  }
}
