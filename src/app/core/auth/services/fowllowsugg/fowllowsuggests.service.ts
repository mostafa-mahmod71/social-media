import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FowllowsuggestsService {
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
  followSugg(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/users/suggestions?limit=3`,
      this.headerToken,
    );
  }
}
