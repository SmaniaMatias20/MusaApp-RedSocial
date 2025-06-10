import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-users-table',
  imports: [NgFor],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  users = [
    {
      username: 'admin123',
      firstName: 'Carlos',
      lastName: 'Pérez',
      email: 'carlos@example.com',
      isActive: true,
    },
    {
      username: 'user456',
      firstName: 'María',
      lastName: 'Gómez',
      email: 'maria@example.com',
      isActive: false,
    },
    {
      username: 'juanito',
      firstName: 'Juan',
      lastName: 'Lopez',
      email: 'juan@example.com',
      isActive: true,
    },
  ];

  toggleStatus(user: any) {
    user.isActive = !user.isActive;
  }
}
