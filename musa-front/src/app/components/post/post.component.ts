import { Component, Input, Output, Signal, EventEmitter } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { PostService } from '../../services/post/post.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { firstValueFrom } from 'rxjs';
import { CommentCreatorComponent } from '../comment-creator/comment-creator.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgIf, NgClass, CommentCreatorComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
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
      console.warn('No hay usuario logueado');
      return;
    }

    try {
      const updatedPost = await firstValueFrom(
        this.postService.addComment(this.post._id, commentText, user)
      );

      this.post = updatedPost;
      this.postCommented.emit();

    } catch (error) {
      console.error('Error al agregar comentario:', error);
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
      this.showPost.emit();
    } catch (error) {
      console.error('Error al cambiar la visibilidad del post:', error);
    }
  }

}
