import { Component } from '@angular/core';
import { PostCreatorComponent } from '../../components/post-creator/post-creator.component';
import { PostComponent } from '../../components/post/post.component';
import { PostService } from '../../services/post/post.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PostCreatorComponent, PostComponent, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  posts: any[] = [];
  username = localStorage.getItem('username') || '';

  constructor(private postService: PostService) {
  }
  ngOnInit(): void {
    this.postService.getPostByNotUsername(this.username).subscribe((data) => {
      this.posts = data;
    });

  }
}