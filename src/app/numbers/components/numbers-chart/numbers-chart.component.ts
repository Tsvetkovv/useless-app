import {Component, Input, OnChanges} from '@angular/core';
import * as D3 from 'd3';

export interface Datum {
  date: Date;
  value: number;
}

@Component({
  selector: 'app-numbers-chart',
  templateUrl: './numbers-chart.component.html',
  styleUrls: ['./numbers-chart.component.css']
})
export class NumbersChartComponent implements OnChanges {
  @Input() height = 300;
  @Input() width = 600;
  @Input() data: Datum[] = [];
  @Input() range = 100;

  xScale: D3.ScaleTime<number, number> = null;
  yScale: D3.ScaleLinear<number, number> = null;
  transform = '';
  margins = 20;
  chartWidth = this.width;
  chartHeight = this.height;
  barHeights: number[] = [];
  barWidth = 0;
  xCoordinates: number[] = [];

  mostFrequentDate(array: Array<Date>): Date {
    const counts = {};
    let compare = -1;
    let mostFrequent: Date = null;

    array.forEach((date) => {
      const item = date.toString();
      if (counts[item] === undefined) {
        counts[item] = 1;
      } else {
        counts[item]++;
      }
      if (counts[item] > compare) {
        compare = counts[item];
        mostFrequent = date;
      }
    });

    return mostFrequent;
  }

  groupByMostFrequentPerDay(data: Datum[]) {
    return D3.nest<Datum, number>()
      .key((d: Datum) => new Date(d.date).setHours(0, 0, 0, 0).toString())
      .key((d: Datum) => d.value.toString())
      .rollup((values) => values.length)
      .entries(data)
      .map((item: { key: string, values: { key: string, value: number }[] }) => {
        return {
          // day
          date: new Date(+item.key),
          // most frequent number for this day
          value: +item.values.sort((a, b) => D3.descending(a.value, b.value))[0].key
        };
      });
  }

  ngOnChanges() {
    const data: Datum[] = this.groupByMostFrequentPerDay(this.data);
    this.chartHeight = this.height;
    this.chartWidth = this.width;
    this.barWidth = this.chartWidth / data.length;
    if (this.barWidth > 50) {
      this.barWidth = 50;
    }

    this.xScale = D3.scaleTime()
      .domain(D3.extent(data, (d: Datum) => d.date))
      .rangeRound([this.margins, this.chartWidth - this.margins - this.barWidth]);
    this.yScale = D3.scaleLinear()
      .domain([0, this.range])
      .range([this.chartHeight, 0]);


    this.barHeights = data.map((item: Datum) => this.barHeight(item.value));
    this.xCoordinates = data.map((item: Datum) => this.xScale(item.date));

    // use transform to flip the chart upside down, so the bars start from bottom
    this.transform = `scale(1, -1) translate(0, ${-this.chartHeight})`;
  }

  clampHeight(value: number) {
    if (value < 0) {
      return 0;
    }
    if (this.chartHeight <= 0) {
      return 0;
    }
    if (value > this.chartHeight) {
      return this.chartHeight;
    }
    return value;
  }

  barHeight(value) {
    return this.clampHeight(this.chartHeight - this.yScale(value));
  }

}
