import { Component, computed, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  userSignal!: Signal<User | null>;

  username = computed(() => this.userSignal()?.username || '');
  firstName = computed(() => this.userSignal()?.firstName || '');
  lastName = computed(() => this.userSignal()?.lastName || '');
  isAdmin = computed(() => this.userSignal()?.isAdmin || false);

  constructor(private authService: AuthService) {
    this.userSignal = this.authService.currentUser;
  }

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
