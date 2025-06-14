import { Component } from '@angular/core';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard-users',
  imports: [UsersTableComponent, RouterLink, NgIf, CreateUserComponent],
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.css'
})
export class DashboardUsersComponent {
  isCreateUserModalOpen = false;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });

  }

  handleToggleVisibility(user: any) {
    user.show = !user.show;
    this.userService.updateVisibility(user._id, user.show).subscribe();
  }

  openCreateUserModal() {
    this.isCreateUserModalOpen = true;
  }

  closeCreateUserModal() {
    this.isCreateUserModalOpen = false;
  }


}
