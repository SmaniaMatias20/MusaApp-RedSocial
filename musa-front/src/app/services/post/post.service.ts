import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.apiUrl + '/posts';

  constructor(private http: HttpClient) { }

  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/create', formData);
  }

  getPostsById(id: string, isAdmin: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/${id}`, {
      params: { isAdmin }
    });
  }


  getPosts(isAdmin: string): Observable<Post[]> {
    console.log(isAdmin);
    return this.http.get<Post[]>(`${this.apiUrl}/all`, {
      params: { isAdmin }
    });
  }


  likePost(postId: string, user: User | null): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/like/${postId}`, {
      idUser: user?.id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      profileImage: user?.profileImage
    });
  }

  addComment(postId: string, content: string, user: User | null): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/comments/${postId}`, {
      content: content,
      idUser: user?.id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      profileImage: user?.profileImage
    });
  }


}
