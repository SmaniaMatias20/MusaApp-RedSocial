import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { formatTimeAgo } from '../../utils/utils';

@Component({
  selector: 'app-post-interactions',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './post-interactions.component.html',
  styleUrls: ['./post-interactions.component.css']
})
export class PostInteractionsComponent {
  @Input() likes: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    profileImage: string;
  }[] = [];

  @Input() comments: {
    _id: string;
    username: string;
    content: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    date: string;
    formattedDate: string;
    edited: boolean;
    show: boolean;
    idUser: string;
  }[] = [];

  @Output() onClose = new EventEmitter<void>();
  @Output() commentEdited = new EventEmitter<{ id: string; newContent: string }>();

  currentUserId = localStorage.getItem('id') || '';
  editingCommentId: string | null = null;
  editedText: string = '';

  activeTab: 'likes' | 'comments' = 'likes';

  ngOnInit(): void {
    this.comments.forEach(comment => {
      comment['formattedDate'] = formatTimeAgo(comment.date); // sin tocar comment.date
    });

  }

  startEdit(comment: any) {
    this.editingCommentId = comment._id;
    this.editedText = comment.content;
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editedText = '';
  }

  saveEdit(commentId: string) {
    const trimmed = this.editedText.trim();
    if (trimmed.length > 0) {
      this.commentEdited.emit({ id: commentId, newContent: trimmed });
      this.cancelEdit();
      this.close();
    }
  }

  close() {
    this.onClose.emit();
  }
}
