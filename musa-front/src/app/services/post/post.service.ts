import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.apiUrl + '/posts';

  constructor(private http: HttpClient) { }

  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/create', formData);
  }

  getPostsByUsername(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`, {
      params: { username: username }
    });
  }

  getPostByNotUsername(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}` + '/not', {
      params: { username: username }
    });
  }

}
