import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [NgIf],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  user = {
    name: 'emily',
    username: '@Smania',
    time: '20h',
    verified: true,
    profilePic: 'assets/emily.jpg'
  };

  content = `Holaaaaaa`;

  stats = {
    replies: 5,
    retweets: 1,
    likes: 93,
    views: '4 mil'
  };
}
