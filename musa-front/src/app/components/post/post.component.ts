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
  @Input() post: any;
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() profileImage!: string;
  loading = false;
  userSignal!: Signal<User | null>;
  @Output() interactionsRequested = new EventEmitter<void>();
  showCommentCreator = false;

  onClick() {
    this.interactionsRequested.emit();
  }


  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.userSignal = this.authService.currentUser;
  }

  async likePost(post: any): Promise<void> {
    this.loading = true;
    const user = this.userSignal();

    if (!user) {
      return;
    }

    try {
      const response = await firstValueFrom(this.postService.likePost(post._id, user));
      console.log('Like exitoso:', response);
      this.postLiked.emit();
      this.loading = false;
    } catch (error) {
      console.error('Error al hacer like:', error);
    }
  }

  commentPost(post: any) {
    this.showCommentCreator = true;
    // guardar el comentario en el post


    // this.postCommented.emit();
    // console.log('Comentando post:', post);
  }

  hasUserLiked(post: any): boolean {
    const user = this.userSignal();
    if (!user || !post.likes) return false;
    return post.likes.some((like: { username: string }) => like.username === user.username);
  }



}
