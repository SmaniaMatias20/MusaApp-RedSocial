
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
//import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  // Signal para el usuario actual
  currentUser = signal<User | null>(this.getUserFromLocalStorage());

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // register(formData: User) {
  //   return this.http.post<User>(this.apiUrl + '/register', formData);
  // }

  register(formData: FormData) {
    console.log(formData);
    return this.http.post<User>(this.apiUrl + '/register', formData);
  }

  async login(usernameOrEmail: string, password: string): Promise<User> {
    try {
      const response = this.http.post<User>(`${this.apiUrl}/login`, { usernameOrEmail, password });
      const user = await firstValueFrom(response);

      this.saveUserToLocalStorage(user);
      this.currentUser.set(user);

      await this.router.navigate(['/home']);
      return user;

    } catch (error) {
      console.error('Error en AuthService.login:', error);
      throw new Error('Credenciales inválidas o error en el servidor.');
    }
  }

  logout(): void {
    localStorage.clear();
    this.currentUser.set(null);
    this.router.navigate(['/auth']);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem('username', user.username);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('isAdmin', user.isAdmin.toString());
  }

  private getUserFromLocalStorage(): User | null {
    const username = localStorage.getItem('username');
    if (!username) return null;
    return {
      username,
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      accessToken: localStorage.getItem('accessToken') || '',
      isAdmin: localStorage.getItem('isAdmin'),
    } as User;
  }
}
