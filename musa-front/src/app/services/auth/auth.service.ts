import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { Router } from '@angular/router';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  birthDate: string;
  description?: string;
  profileImage?: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/register', user);
  }

  login(usernameOrEmail: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/login', { usernameOrEmail, password });
  }

  logout(): void {
    // localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/auth']);
  }

}
