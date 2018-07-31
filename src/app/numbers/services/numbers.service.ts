import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {from} from 'rxjs/observable/from';
import {UserNumber} from '../models/user-number';

@Injectable()
export class NumbersService {
  private static builder() {
    return class Builder {
      private _days = 5;
      private _count = this._days * 10;
      private _valueLimit = 10;

      private static randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      }

      days(days: number) {
        this._days = days;
        return this;
      }

      count(count: number) {
        this._count = count;
        return this;
      }

      valueLimit(valueLimit: number) {
        this._valueLimit = valueLimit;
        return this;
      }

      build(): UserNumber[] {
        const today = new Date();
        return new Array(this._count).fill(null).map(() => ({
          date: Builder.randomDate(new Date(new Date().setDate(today.getDate() - this._days)), today),
          value: Math.floor(Math.random() * (this._valueLimit + 1)),
        }));
      }
    };
  }

  public getNumbers(): Observable<UserNumber[]> {
    const builder = NumbersService.builder();
    return from([new builder().build()]);
  }
}
