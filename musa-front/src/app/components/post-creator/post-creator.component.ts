import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

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

  post(): void {
    console.log('Tweet:', this.tweetText);
    console.log('Images:', this.imageFiles);

    // Acá enviarías el contenido a un backend (ej. via HttpClient)
    // this.http.post('api/tweets', { text: this.tweetText, images: this.imageFiles });

    // Reiniciar valores
    this.tweetText = '';
    this.imageFiles = [];
    this.imagePreviews = [];
  }
}
