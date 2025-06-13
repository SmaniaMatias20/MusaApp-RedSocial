import { Component } from '@angular/core';
import ApexCharts from 'apexcharts'
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

  ]
})
export class GenericGraphicComponent {

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Ventas',
          data: [10, 20, 30, 40]
        }
      ],
      chart: {
        type: 'line'
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar']
      },
      title: {
        text: 'Gráfico de prueba'
      },
      stroke: {
        curve: 'smooth'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      }
    };
  }

}
