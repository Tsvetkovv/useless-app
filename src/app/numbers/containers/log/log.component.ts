import {Component, OnInit} from '@angular/core';
import {UserNumber} from '../../models/user-number';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  items: UserNumber[] = [
    {id: 1, date: new Date(), value: Math.random()}
  ];

  constructor() { }

  ngOnInit() {
  }

}