import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { User } from '../../../../models/user.model';


@Component({
  selector: 'app-users-table',
  imports: [NgFor],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  @Input() users: User[] = [];

  constructor() { }

  toggleStatus(user: User) {
    user.show = !user.show;
  }

}
