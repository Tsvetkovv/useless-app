import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialpad',
  templateUrl: './dialpad.component.html',
  styleUrls: ['./dialpad.component.css']
})
export class DialpadComponent implements OnInit {
  @Output() submit = new EventEmitter<number>();
  value = '';
  numbers = new Array(9).fill(0).map((v, i) => i + 1);

  constructor() {
  }

  ngOnInit() {
  }

  append(value) {
    this.value += value;
  }

  confirm() {
    if (this.value) {
      this.submit.emit(+this.value);
    }
    console.log(+this.value);
  }

  clear() {
    this.value = '';
  }
}
