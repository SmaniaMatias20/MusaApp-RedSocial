import { Component, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { User } from '../../../../models/user.model';
import { EventEmitter } from '@angular/core';




@Component({
  selector: 'app-users-table',
  imports: [NgFor],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  @Input() users: User[] = [];

  @Output() toggleUserStatus = new EventEmitter<any>();

  constructor() { }

  onToggle(user: any) {
    this.toggleUserStatus.emit(user);
  }

}
