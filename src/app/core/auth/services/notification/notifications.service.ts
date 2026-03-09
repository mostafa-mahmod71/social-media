import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  headerToken: any;

  constructor() {
    this.setHeaderToken();
  }
  setHeaderToken() {
    if (isPlatformBrowser(this.platformId)) {
      this.headerToken = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('socialToken')}`,
        },
      };
    }
  }

  getAllNotif(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/notifications?unread=false&page=1&limit=10`,
      this.headerToken,
    );
  }
}
