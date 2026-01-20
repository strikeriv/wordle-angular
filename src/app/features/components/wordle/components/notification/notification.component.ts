import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'wordle-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class WordleNotificationComponent {
  protected readonly notifications;

  constructor(private readonly notificationService: NotificationService) {
    this.notifications = this.notificationService.notifications;
  }
}
