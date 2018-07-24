import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnChanges {
  @Input()
  lastItem: number;
  logItems: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const {currentValue} = changes.lastItem;
    if (currentValue !== undefined) {
      this.logItems.push(currentValue);
    }
  }

}
