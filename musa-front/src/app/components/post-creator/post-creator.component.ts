import { Component, computed, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PostService } from '../../services/post/post.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post-creator',
  imports: [FormsModule, NgIf],
  standalone: true,
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent {
  tweetText: string = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;

  username = localStorage.getItem('username') || '';
  userSignal!: Signal<User | null>;
  profileImage = computed(() => this.userSignal()?.profileImage || '');

  constructor(private postService: PostService, private authService: AuthService) {
    this.userSignal = this.authService.currentUser;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      return;
    }

    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  async post(): Promise<void> {
    if (!this.tweetText.trim()) {
      return;
    }

    const formData = new FormData();
    formData.append('content', this.tweetText);
    formData.append('username', this.username);

    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }

    try {
      const response = await this.postService.createPost(formData).toPromise();
      this.tweetText = '';
      this.imageFile = null;
      this.imagePreview = null;
    } catch (error) {
      console.error('Error creando post:', error);
    }
  }


}
