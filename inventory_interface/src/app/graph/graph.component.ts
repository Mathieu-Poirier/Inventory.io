import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements AfterViewInit, OnDestroy {
  @ViewChild('d3Graph', { static: true })
  private d3Graph!: ElementRef;

  dataPoints: any[] = [];
  private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | null = null;
  private xScale: d3.ScaleTime<number, number> | null = null;
  private yScale: d3.ScaleLinear<number, number> | null = null;
  private fetchDataInterval: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.initializeGraph();
    this.fetchDataPeriodically();
  }

  ngOnDestroy(): void {
    clearInterval(this.fetchDataInterval);
  }

  initializeGraph(): void {
    console.log('initializeGraph');
    this.svg = d3.select<SVGSVGElement, unknown>(this.d3Graph?.nativeElement);

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = this.svg.node()?.getBoundingClientRect().width || 800;
    const height = 400;

    this.xScale = d3.scaleTime()
      .range([0, width]);

    this.yScale = d3.scaleLinear()
      .range([height, 0]);

    this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('class', 'chart');

    // X-axis label
    this.svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .style('text-anchor', 'middle')
      .text('Time');

    // Y-axis label
    this.svg.append('text')
      .attr('x', -height / 2)
      .attr('y', -margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Parts per Minute');
  }

  fetchDataPeriodically(): void {
    this.fetchData();
    this.fetchDataInterval = setInterval(this.fetchData.bind(this), 60000);
  }

  fetchData(): void {
    console.log('fetchData');
    const apiUrl = 'http://localhost:3000/visualization';
    this.http.get(apiUrl).subscribe((data: any) => {
      console.log('Data received:', data);
      // Append new data to the existing dataPoints
      this.dataPoints.push(...data.data);

      // Limit the number of data points to the last N points
      const maxDataPoints = 100;
      if (this.dataPoints.length > maxDataPoints) {
        this.dataPoints = this.dataPoints.slice(this.dataPoints.length - maxDataPoints);
      }

      this.updateD3Graph();
    });
  }

  updateD3Graph(): void {
    console.log('updateD3Graph');
    if (!this.svg || !this.xScale || !this.yScale) {
      console.error('Initialization error');
      return;
    }

    const height = 400;

    console.log('Data points:', this.dataPoints);
    console.log('X domain:', this.xScale.domain());
    console.log('Y domain:', this.yScale.domain());

    // Filter out null or undefined data points
    const filteredData = this.dataPoints.filter(d => d.time && d.partsPerMinute);

    // Update scales with new data
    this.xScale.domain(d3.extent(filteredData, (d) => new Date(d.time)) as [Date, Date]);
    this.yScale.domain([0, d3.max(filteredData, (d) => d.partsPerMinute)!]);

    // Select the chart group
    const chart = this.svg.select<SVGGElement>('g.chart');

    // Create a transition for updating the bars
    const t = d3.transition().duration(1000);

    // Update existing bars
    const bars = chart.selectAll<SVGRectElement, any>('rect').data(filteredData);

    console.log('Bars:', bars);

    bars.join(
      (enter) =>
        enter
          .append('rect')
          .attr('fill', 'blue')
          .attr('x', (d) => this.xScale!(d.time) || 0)
          .attr('y', height)
          .attr('width', 4)
          .attr('height', 4)
          .call((enter) => enter.transition(t).attr('y', (d) => this.yScale!(d.partsPerMinute) || 0)
            .attr('height', (d) => height - (this.yScale!(d.partsPerMinute) || 0))
      )
    );
  }
}

