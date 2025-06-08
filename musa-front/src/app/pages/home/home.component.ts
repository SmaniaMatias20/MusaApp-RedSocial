import { Component } from '@angular/core';
import { PostCreatorComponent } from '../../components/post-creator/post-creator.component';
import { PostComponent } from '../../components/post/post.component';
import { PostService } from '../../services/post/post.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PostCreatorComponent, PostComponent, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  posts: any[] = [];
  username = localStorage.getItem('username') || '';

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
    if (diffMin < 60) return `${diffMin}min`;
    if (diffHrs < 24) return `${diffHrs}h`;
    if (diffDays === 1) return 'ayer';
    if (diffDays < 7) return `${diffDays}d`;

    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data.map(post => {
        post.date = this.formatTimeAgo(post.date);
        return post;
      });
    });

  }
}