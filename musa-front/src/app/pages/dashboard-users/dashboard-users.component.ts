import { Component } from '@angular/core';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-users',
  imports: [UsersTableComponent, RouterLink],
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.css'
})
export class DashboardUsersComponent {

  users: User[] = [];

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });

  }

}
