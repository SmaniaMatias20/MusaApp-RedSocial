import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexDataLabels,
  ApexGrid
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
};


@Component({
  selector: 'app-generic-graphic',
  standalone: true, // 👈 Esto es lo que falta
  templateUrl: './generic-graphic.component.html',
  styleUrls: ['./generic-graphic.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgIf

  ]
})
export class GenericGraphicComponent {
  @Input() chartOptions!: ChartOptions;
}