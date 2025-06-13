import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { formatTimeAgo } from '../../utils/utils';

@Component({
  selector: 'app-post-interactions',
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './post-interactions.component.html',
  styleUrls: ['./post-interactions.component.css']
})
export class PostInteractionsComponent {
  @Input() likes: { id: number, username: string, firstName: string, lastName: string, profileImage: string }[] = [];
  @Input() comments: { id: number, username: string, content: string, firstName: string, lastName: string, profileImage: string, date: string, edited: boolean, show: boolean }[] = [];

  @Output() onClose = new EventEmitter<void>();

  activeTab: 'likes' | 'comments' = 'likes';

  ngOnInit(): void {
    this.comments.forEach(comment => {
      comment.date = formatTimeAgo(comment.date);
    });
  }

  close() {
    this.onClose.emit();
  }
}
