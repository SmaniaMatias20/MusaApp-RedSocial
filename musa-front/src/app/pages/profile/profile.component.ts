import { Component } from '@angular/core';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { PostComponent } from '../../components/post/post.component';
import { NgFor } from '@angular/common';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-profile',
  imports: [ProfileHeaderComponent, PostComponent, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  posts: Post[] = [];
  username = localStorage.getItem('username') || '';
  firstName = localStorage.getItem('firstName') || '';
  lastName = localStorage.getItem('lastName') || '';
  profileImage = localStorage.getItem('profileImage') || '';

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPostsByUsername(this.username).subscribe((data) => {
      this.posts = data;
    });
  }

}