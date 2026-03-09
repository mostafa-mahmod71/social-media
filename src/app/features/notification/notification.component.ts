import { Component, inject, OnInit } from '@angular/core';
import { NotificationsService } from '../../core/auth/services/notification/notifications.service';
import { Inotifications } from '../../core/models/Inotification/inotifications.interface';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationsService = inject(NotificationsService);
  notifications: Inotifications[] = [];

  ngOnInit(): void {
    this.getallnotifi();
  }
  getallnotifi() {
    this.notificationsService.getAllNotif().subscribe({
      next: (res) => {
        if (res.success) {
          this.notifications = res.data.notifications;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  markRead(id: string) {
    const item = this.notifications.find((n) => n._id === id);
    if (item) item.isRead = true;
  }
}
