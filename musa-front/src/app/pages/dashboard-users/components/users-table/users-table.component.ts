import { Component, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../../../models/user.model';
import { EventEmitter } from '@angular/core';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';


@Component({
  selector: 'app-users-table',
  imports: [NgFor, NgIf, SpinnerComponent],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Input() loading: boolean = true;

  @Output() toggleUserStatus = new EventEmitter<any>();

  constructor() { }

  onToggle(user: any) {
    this.toggleUserStatus.emit(user);
  }

}
