import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, userData);
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}` + '/all');
  }

  updateUser(id: string, formData: FormData): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, formData);
  }

  getUsersForAside(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`, {
      params: { username: username }
    });
  }

  updateVisibility(id: string, show: boolean): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/updateVisibility/${id}`, { show: show });
  }

}
