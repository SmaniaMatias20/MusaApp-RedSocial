import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  username: string = localStorage.getItem('username') || '';
  firstName: string = localStorage.getItem('firstName') || '';
  lastName: string = localStorage.getItem('lastName') || '';
  isAdmin: boolean = localStorage.getItem('isAdmin') === 'true';

  constructor(
    private authService: AuthService
  ) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    setTimeout(() => {
      this.menuOpen = false;
    }, 200);
  }

  logout(): void {
    this.authService.logout();
  }


}


