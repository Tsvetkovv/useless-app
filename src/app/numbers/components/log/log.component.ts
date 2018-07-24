import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnDestroy {
  @Input()
  enteredNumbers$: Observable<number>;
  logItems: number[] = [];
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.enteredNumbers$.subscribe(next => {
      if (next !== undefined) {
        this.logItems.push(next);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
