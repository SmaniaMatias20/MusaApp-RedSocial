import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  show = false;
  message = '';

  showToast(message: string, duration: number = 3000) {
    this.message = message;
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, duration);
  }
}
