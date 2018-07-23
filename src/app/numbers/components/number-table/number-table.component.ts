import {Component, Input} from '@angular/core';
import {UserNumber} from '../../models/user-number';

@Component({
  selector: 'app-number-table',
  templateUrl: './number-table.component.html',
  styleUrls: ['./number-table.component.css']
})
export class NumberTableComponent {
  @Input() items: UserNumber[];
  displayedColumns = ['date', 'value'];
}
