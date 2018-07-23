import {Component, Input} from '@angular/core';
import {UserNumber} from '../../models/user-number';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css']
})
export class LogTableComponent {
  @Input() items: UserNumber[];
}
