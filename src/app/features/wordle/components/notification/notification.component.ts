import { Component, input } from '@angular/core';

@Component({
  selector: 'wordle-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class WordleNotificationComponent {
  message = input.required<string>();

  showNotification = false;

  show() {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 1500);
  }
}
