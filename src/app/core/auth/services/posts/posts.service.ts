import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
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
  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts`, this.headerToken);
  }
  createPost(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts`, data, this.headerToken);
  }
  getSinglePost(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`, this.headerToken);
  }
}
