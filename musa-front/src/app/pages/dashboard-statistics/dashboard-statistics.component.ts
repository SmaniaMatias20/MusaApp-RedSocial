import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { GenericGraphicComponent } from './components/generic-graphic/generic-graphic.component';
import { ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";


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
  selector: 'app-dashboard-statistics',
  standalone: true,
  templateUrl: './dashboard-statistics.component.html',
  imports: [
    CommonModule,
    NgApexchartsModule,
    GenericGraphicComponent,
    RouterLink

  ]
})
export class DashboardStatisticsComponent {
  chartOptions = {
    chart: { type: 'line' },
    series: [{ name: 'Ventas', data: [10, 20, 30] }],
    xaxis: { categories: ['Ene', 'Feb', 'Mar'] },
    title: { text: 'Gráfico de prueba' },
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } }
  };
}



