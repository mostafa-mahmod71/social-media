import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangepassService {
  private readonly httpClienttt = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  headerToken: any;

  changepass(data: any): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('socialToken');
      this.headerToken = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    }

    return this.httpClienttt.patch(
      `${environment.baseUrl}/users/change-password`,
      data,
      this.headerToken,
    );
  }
}
