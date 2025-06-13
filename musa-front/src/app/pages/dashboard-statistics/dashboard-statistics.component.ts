import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard-statistics',
  imports: [RouterLink, NgIf, NgClass],
  templateUrl: './dashboard-statistics.component.html',
  styleUrls: ['./dashboard-statistics.component.css']
})
export class DashboardStatisticsComponent {
  selectedTab: string = 'tab1';
}
