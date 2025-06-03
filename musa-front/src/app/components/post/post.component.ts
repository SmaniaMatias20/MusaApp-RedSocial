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
    username: '@https_memi',
    time: '20h',
    verified: true,
    profilePic: 'assets/emily.jpg'
  };

  content = `que bizarro cuando gente del secundario que no se hubiera juntado conmigo ni en pedo me empieza a responder historias jsksjskdjsjd`;

  stats = {
    replies: 5,
    retweets: 1,
    likes: 93,
    views: '4 mil'
  };
}
