import { Component } from '@angular/core';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { PostComponent } from '../../components/post/post.component';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-profile',
  imports: [ProfileHeaderComponent, PostComponent, NgFor, NgIf],
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

  private formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return 'hace unos segundos';
    if (diffMin < 60) return `${diffMin} min`;
    if (diffHrs < 24) return `${diffHrs} h`;
    if (diffDays === 1) return 'ayer';
    if (diffDays < 7) return `hace ${diffDays} días`;

    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }


  ngOnInit(): void {
    this.postService.getPostsByUsername(this.username).subscribe((data) => {
      this.posts = data.map(post => {
        post.date = this.formatTimeAgo(post.date);
        return post;
      });
    });

  }

}