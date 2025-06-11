import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostCreatorComponent } from '../../components/post-creator/post-creator.component';
import { PostComponent } from '../../components/post/post.component';
import { PostService } from '../../services/post/post.service';
import { NgIf, NgFor } from '@angular/common';
import { PostInteractionsComponent } from '../../components/post-interactions/post-interactions.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [PostCreatorComponent, PostComponent, NgIf, NgFor, PostInteractionsComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: any[] = [];
  loading = false;
  username = localStorage.getItem('username') || '';
  isAdmin = localStorage.getItem('isAdmin') || '';
  selectedPost: any = null;
  private intervalId: any;

  constructor(private postService: PostService) { }

  openPostInteractions(post: any): void {
    this.selectedPost = post;
  }

  closePostInteractions(): void {
    this.selectedPost = null;
  }

  ngOnInit(): void {
    this.loadPosts();
    this.intervalId = setInterval(() => {
      this.loadPosts();
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onPostCreated(): void {
    this.loadPosts();
  }

  onPostLiked(): void {
    this.loadPosts();
  }

  onPostCommented(): void {
    this.loadPosts();
  }

  onShowPost(): void {
    this.loadPosts();
  }

  private async loadPosts(): Promise<void> {
    this.loading = true;
    try {
      const data = await firstValueFrom(this.postService.getPosts(this.isAdmin));
      this.posts = data.map(post => {
        post.date = this.formatTimeAgo(post.date);
        return post;
      });
    } catch (error) {
      console.error('Error al cargar posts:', error);
    } finally {
      this.loading = false;
    }
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
}
