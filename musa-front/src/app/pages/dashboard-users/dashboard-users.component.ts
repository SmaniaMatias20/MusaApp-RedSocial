import { Component } from '@angular/core';
import { UsersTableComponent } from './components/users-table/users-table.component';

@Component({
  selector: 'app-dashboard-users',
  imports: [UsersTableComponent],
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.css'
})
export class DashboardUsersComponent {

}
