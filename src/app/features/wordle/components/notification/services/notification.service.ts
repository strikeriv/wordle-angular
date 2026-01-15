import { Injectable, signal } from '@angular/core';
import { Notification } from '../interfaces/notification.interface';

@Injectable()
export class NotificationService {
  private readonly notificationsSignal = signal<Notification[]>([]);

  public readonly notifications = this.notificationsSignal.asReadonly();

  show(message: string) {
    const id = Date.now();
    const newNotification: Notification = { id, message };

    this.notificationsSignal.update((prev) => [newNotification, ...prev]);

    setTimeout(() => this.remove(id), 1250);
  }

  remove(id: number) {
    this.notificationsSignal.update((prev) => prev.filter((n) => n.id !== id));
  }
}
