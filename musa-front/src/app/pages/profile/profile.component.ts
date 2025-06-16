import { Component, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { PostComponent } from '../../components/post/post.component';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';
import { PostInteractionsComponent } from '../../components/post-interactions/post-interactions.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { firstValueFrom } from 'rxjs';
import { formatTimeAgo } from '../../utils/utils';
import { ToastComponent } from '../../components/toast/toast.component';


@Component({
  selector: 'app-profile',
  imports: [ProfileHeaderComponent, PostComponent, NgFor, NgIf, PostInteractionsComponent, SpinnerComponent, ToastComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  posts: Post[] = [];
  selectedPost: any = null;
  loading = false;
  idUser = localStorage.getItem('id') || '';
  username = localStorage.getItem('username') || '';
  firstName = localStorage.getItem('firstName') || '';
  lastName = localStorage.getItem('lastName') || '';
  profileImage = localStorage.getItem('profileImage') || '';
  isAdmin = localStorage.getItem('isAdmin') || '';

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.loadPosts();
  }

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
      const data = await firstValueFrom(this.postService.getPostsById(this.idUser, this.isAdmin));
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