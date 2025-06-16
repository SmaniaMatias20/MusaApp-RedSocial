import { Component } from '@angular/core';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-dashboard-users',
  imports: [UsersTableComponent, RouterLink, NgIf, CreateUserComponent, SpinnerComponent],
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.css'
})
export class DashboardUsersComponent {
  loading = false;
  isCreateUserModalOpen = false;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });

    this.loading = false;
  }

  handleToggleVisibility(user: any) {
    user.show = !user.show;
    this.userService.updateVisibility(user._id, user.show).subscribe();
  }

  openCreateUserModal() {
    this.isCreateUserModalOpen = true;
  }

  async closeCreateUserModal() {
    this.isCreateUserModalOpen = false;
    await this.loadUsers();
  }


}
