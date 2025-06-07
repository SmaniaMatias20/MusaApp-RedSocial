import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [NgIf],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: any;
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() profileImage!: string;

  constructor() {
  }
}


