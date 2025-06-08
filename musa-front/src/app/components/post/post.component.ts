import { Component, Input, Output, Signal, EventEmitter } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { PostService } from '../../services/post/post.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Output() postLiked = new EventEmitter<void>();
  @Input() post: any;
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() profileImage!: string;
  loading = false;
  userSignal!: Signal<User | null>;
  @Output() interactionsRequested = new EventEmitter<void>();

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

  hasUserLiked(post: any): boolean {
    const user = this.userSignal();
    if (!user || !post.likes) return false;
    return post.likes.some((like: { username: string }) => like.username === user.username);
  }



}
