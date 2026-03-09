import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  //// token
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

  getprofiledata(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data`, this.headerToken);
  }

  uploadprofilephoto(data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo`, data, this.headerToken);
  }
}
