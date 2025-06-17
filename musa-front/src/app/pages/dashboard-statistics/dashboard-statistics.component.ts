import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenericGraphicComponent } from './components/generic-graphic/generic-graphic.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { ChartFilterComponent } from './components/chart-filter/chart-filter.component';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { firstValueFrom } from 'rxjs';

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
    RouterLink,
    ChartFilterComponent,
  ],
  providers: [StatisticsService]
})
export class DashboardStatisticsComponent {
  selectedTab: number = 1;
  selected: string = 'day';
  data2: any;
  chartOptions = {
    chart: { type: 'line' },
    series: [{ name: 'Ventas', data: [10, 20, 30] }],
    xaxis: { categories: ['Ene', 'Feb', 'Mar'] },
    title: { text: 'Gráfico de prueba' },
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } }
  };


  ngOnInit(): void {
    //Hacer el fetch de la informacion teniendo en cuenta el grafico seleccionado y el rango
  }


  changeTab(tab: number) {
    this.selectedTab = tab;
    // Cargar la informacion nuevamente teniendo en cuenta el grafico seleccionado y el rango
  }

  async getData(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.statisticsService.getStatistics(this.selectedTab, this.selected)
      );
      this.data2 = data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }


  constructor(private statisticsService: StatisticsService) { }


}



