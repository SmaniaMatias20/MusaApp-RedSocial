import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-chart-filter',
  imports: [NgFor, NgClass],
  templateUrl: './chart-filter.component.html',
  styleUrls: ['./chart-filter.component.css']
})
export class ChartFilterComponent {
  selected: string = 'day';

  @Output() rangeChange = new EventEmitter<string>();

  selectRange(range: string) {
    this.selected = range;
    this.rangeChange.emit(range);
  }
}
