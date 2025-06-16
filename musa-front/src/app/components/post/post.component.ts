import { Component, Input, Output, Signal, EventEmitter, ViewChild } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { PostService } from '../../services/post/post.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { firstValueFrom } from 'rxjs';
import { CommentCreatorComponent } from '../comment-creator/comment-creator.component';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgIf, NgClass, CommentCreatorComponent, ToastComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @Output() postLiked = new EventEmitter<void>();
  @Output() postCommented = new EventEmitter<void>();
  @Output() interactionsRequested = new EventEmitter<void>();
  @Output() showPost = new EventEmitter<void>();
  @Input() post: any;
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() profileImage!: string;
  loading = false;
  userSignal!: Signal<User | null>;
  showCommentCreator = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.userSignal = this.authService.currentUser;
  }

  onClick() {
    this.interactionsRequested.emit();
  }

  async likePost(post: any): Promise<void> {
    this.loading = true;
    const user = this.userSignal();

    if (!user) {
      return;
    }

    try {
      const response = await firstValueFrom(this.postService.likePost(post._id, user));
      this.postLiked.emit();
      this.loading = false;
    } catch (error) {
      console.error('Error al hacer like:', error);
    }
  }

  commentPost() {
    this.showCommentCreator = true;
  }

  async onCommentCreated(commentText: string) {
    this.showCommentCreator = false;

    const user = this.userSignal();
    if (!user) {
      this.toastComponent.showToast('No hay usuario logueado', 3000);
      return;
    }

    try {
      const updatedPost = await firstValueFrom(
        this.postService.addComment(this.post._id, commentText, user)
      );

      this.post = updatedPost;
      this.toastComponent.showToast('Comentario creado correctamente');
      setTimeout(() => this.postCommented.emit(), 2000);
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      this.toastComponent.showToast('Error al agregar comentario', 3000);
    }
  }

  hasUserLiked(post: any): boolean {
    const user = this.userSignal();
    if (!user || !post.likes) return false;
    return post.likes.some((like: { idUser: string }) => like.idUser === user.id);
  }


  async togglePostVisibility(post: any): Promise<void> {
    try {
      const updatedPost = await firstValueFrom(this.postService.toggleShow(post));
      this.toastComponent.showToast('Post cambiado a ' + (updatedPost.show ? 'visible' : 'oculto'));
      setTimeout(() => this.showPost.emit(), 2000);
    } catch (error) {
      console.error('Error al cambiar la visibilidad del post:', error);
      this.toastComponent.showToast('Error al cambiar la visibilidad del post', 3000);
    }
  }

}
