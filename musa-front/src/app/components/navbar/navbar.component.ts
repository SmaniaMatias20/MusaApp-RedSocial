import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  username: string = localStorage.getItem('username') || '';
  firstName: string = localStorage.getItem('firstName') || '';
  lastName: string = localStorage.getItem('lastName') || '';
  isAdmin: boolean = localStorage.getItem('isAdmin') === 'true';

  constructor(private router: Router) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    setTimeout(() => {
      this.menuOpen = false;
    }, 200);
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/auth']);
  }
}


