import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-post-creator',
  imports: [FormsModule, NgFor],
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent {
  tweetText: string = '';
  imageFiles: File[] = [];
  imagePreviews: string[] = [];

  constructor(private postService: PostService) { }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.imageFiles = Array.from(input.files);
    this.imagePreviews = [];

    this.imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  async post(): Promise<void> {
    if (!this.tweetText.trim()) {
      alert('El contenido no puede estar vacío');
      return;
    }

    const formData = new FormData();
    formData.append('content', this.tweetText);

    this.imageFiles.forEach((file, index) => {
      formData.append('images', file, file.name);
    });

    try {
      const response = await this.postService.createPost(formData).toPromise();
      console.log('Post creado:', response);
      // Limpiar formulario
      this.tweetText = '';
      this.imageFiles = [];
      this.imagePreviews = [];
    } catch (error) {
      console.error('Error creando post:', error);
    }
  }

}
