import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AsideComponent } from './components/aside/aside.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, AsideComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavbar: boolean = true;
  showAside: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Primero, setear según la ruta actual
    const isAuthRoute = this.router.url.includes('/auth');
    console.log(isAuthRoute);
    this.showNavbar = isAuthRoute;
    this.showAside = isAuthRoute;
    this.showFooter = isAuthRoute;

    // Luego, suscribirse a cambios futuros de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const isAuthRoute = !event.url.includes('/auth');
      this.showNavbar = isAuthRoute;
      this.showAside = isAuthRoute;
      this.showFooter = isAuthRoute;
    });
  }
}
