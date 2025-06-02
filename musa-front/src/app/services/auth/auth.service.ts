import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';


// Definís la interfaz User para tipar los datos
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  birthDate: string;  // en frontend manejalo como string (ISO)
  description?: string;
  profileImage?: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  // Método para registrar usuario
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/register', user);
  }

  // Método para login
  login(usernameOrEmail: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/login', { usernameOrEmail, password });
  }

}
