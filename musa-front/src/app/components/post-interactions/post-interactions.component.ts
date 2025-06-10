import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';

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

  private formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return 'hace unos segundos';
    if (diffMin < 60) return `${diffMin}min`;
    if (diffHrs < 24) return `${diffHrs}h`;
    if (diffDays === 1) return 'ayer';
    if (diffDays < 7) return `${diffDays}d`;

    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  ngOnInit(): void {
    this.comments.forEach(comment => {
      comment.date = this.formatTimeAgo(comment.date);
    });
  }

  close() {
    this.onClose.emit(); // Permite al componente padre cerrar el popup
  }
}
