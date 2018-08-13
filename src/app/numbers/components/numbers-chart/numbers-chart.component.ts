import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';

export interface Datum {
  date: Date;
  value: number;
}

@Component({
  selector: 'app-numbers-chart',
  templateUrl: './numbers-chart.component.html',
  styleUrls: ['./numbers-chart.component.css']
})
export class NumbersChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('containerBarChart') element: ElementRef;
  @Input() data: Datum[] = [];
  xScale: d3.ScaleBand<string> /* d3.ScaleTime<number, number> */ = null;
  yScale: d3.ScaleLinear<number, number> = null;
  htmlElement: HTMLElement;
  host: d3.Selection<HTMLElement, Datum[], any, any>;
  chart: d3.Selection<SVGGElement, Datum[], SVGElement, Datum[]>;
  margin = {top: 0, right: 10, bottom: 45, left: 20};
  height = 400;
  width = 400;
  formatDate = d3.timeFormat('%d-%m-%Y');

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select<HTMLElement, Datum[]>(this.htmlElement);
    this.initSVG();
    this.initAxis();
    this.updateScale();
    this.drawAxis();
    this.drawBars();
  }

  initSVG() {
    this.host.html('');
    this.chart = this.host.append<SVGElement>('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append<SVGGElement>('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  initAxis() {
    this.chart.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`);
    this.chart.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', `translate(${this.margin.left}, 0)`);
  }

  updateScale() {
    this.xScale = d3.scaleBand<string>()
      .rangeRound([this.margin.left, this.width - this.margin.left - this.margin.right])
      .domain(this.data.map(v => this.formatDate(v.date)))
      .padding(.2);

    const [yMin, yMax] = d3.extent(this.data, (d: Datum) => d.value);
    const vertPadding = (yMax - yMin) * 0.1;
    this.yScale = d3.scaleLinear()
      .domain([yMin - vertPadding, yMax + vertPadding])
      .range([this.height - this.margin.bottom, this.margin.top]);
  }

  drawAxis() {
    this.chart.select('g.axis--x')
      .call(
        d3.axisBottom(this.xScale)
        // .tickFormat(d3.timeFormat('%Y-%m-%d'))
          .ticks(5))
      .selectAll('text')
      .attr('transform', 'rotate(-35)')
      .attr('dy', '1em')
      .attr('dx', '-1em');
    this.chart.select('g.axis--y')
      .call(d3.axisLeft(this.yScale).ticks(10));
  }

  drawBars() {
    console.log(this.data);
    this.chart.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('fill', '#3f51b5')
      .attr('x', (d) => this.xScale(this.formatDate(d.date)))
      // .attr('y', this.height)
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      // .transition()
      .attr('y', (d) => this.yScale(d.value))
      .attr('height', (d) => this.height - this.margin.bottom - this.yScale(d.value));
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateScale();
      this.drawAxis();
      this.drawBars();
    }
  }
}
