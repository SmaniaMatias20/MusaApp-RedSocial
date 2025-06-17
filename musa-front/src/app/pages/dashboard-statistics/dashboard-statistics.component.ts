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
  ApexTitleSubtitle,
  ChartType
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
  chartOptions: any = null;


  ngOnInit(): void {
    this.getData();
  }


  changeTab(tab: number) {
    this.selectedTab = tab;
    this.getData();
  }

  OnChangeRange(range: string) {
    this.selected = range;
    this.getData();
  }

  async getData(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.statisticsService.getStatistics(this.selectedTab, this.selected)
      );
      this.data2 = data;
      console.log('Datos obtenidos:', data);

      // Extraer los valores para el gráfico
      const counts = data.map((item: any) => item.count);
      const usernames = data.map((item: any) => item.username);

      // Actualizar opciones del gráfico
      this.chartOptions = {
        chart: { type: 'bar' as ChartType },
        series: [{ name: 'Publicaciones por usuario', data: counts }],
        xaxis: { categories: usernames },
        title: { text: 'Publicaciones por usuario' },
        stroke: { curve: 'smooth' },
        dataLabels: { enabled: true },
        grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } }
      };

      console.log('Gráfico actualizado con:', this.chartOptions);

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }



  constructor(private statisticsService: StatisticsService) { }


}



