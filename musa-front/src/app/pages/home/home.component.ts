import { Component, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { PostCreatorComponent } from '../../components/post-creator/post-creator.component';
import { PostComponent } from '../../components/post/post.component';
import { PostService } from '../../services/post/post.service';
import { NgIf, NgFor } from '@angular/common';
import { PostInteractionsComponent } from '../../components/post-interactions/post-interactions.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { firstValueFrom } from 'rxjs';
import { formatTimeAgo } from '../../utils/utils';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-home',
  imports: [PostCreatorComponent, PostComponent, NgIf, NgFor, PostInteractionsComponent, SpinnerComponent, ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  posts: any[] = [];
  loading = false;
  username = localStorage.getItem('username') || '';
  isAdmin = localStorage.getItem('isAdmin') || '';
  selectedPost: any = null;
  private intervalId: any;

  constructor(private postService: PostService) { }

  async onCommentEdited(comment: any) {
    try {
      await firstValueFrom(
        this.postService.editComment(this.selectedPost._id, comment.newContent, comment.id)
      );
      await this.loadPosts();
      this.toastComponent.showToast('Comentario editado correctamente');
    } catch (error) {
      console.error('Error al editar comentario:', error);
      this.toastComponent.showToast('Error al editar comentario', 3000);
    }
  }

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

  async onPostCreated(): Promise<void> {
    await this.loadPosts();
  }

  async onPostLiked(): Promise<void> {
    await this.loadPosts();
  }

  async onPostCommented(): Promise<void> {
    await this.loadPosts();
  }

  async onShowPost(): Promise<void> {
    await this.loadPosts();
  }

  private async loadPosts(): Promise<void> {
    this.loading = true;
    try {
      const data = await firstValueFrom(this.postService.getPosts(this.isAdmin));
      this.posts = data.map(post => {
        post.date = formatTimeAgo(post.date);
        return post;
      });
    } catch (error) {
      console.error('Error al cargar posts:', error);
    } finally {
      this.loading = false;
    }
  }
}
