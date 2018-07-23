import {Component, OnInit} from '@angular/core';
import {UserNumber} from '../../models/user-number';

@Component({
  selector: 'app-all-values',
  templateUrl: './all-values.component.html',
  styleUrls: ['./all-values.component.css']
})
export class AllValuesComponent implements OnInit {
  items: UserNumber[] = [
    {id: 1, date: new Date(), value: Math.random()}
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
