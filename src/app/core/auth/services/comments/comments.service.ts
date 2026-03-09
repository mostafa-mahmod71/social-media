import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PostsService } from '../posts/posts.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
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
  getAllComments(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}/comments`, this.headerToken);
  }
  createComment(data: any, postId: any): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/posts/${postId}/comments`,
      data,
      this.headerToken,
    );
  }

  deletComment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/posts/${postId}/comments/${commentId}`,
      this.headerToken,
    );
  }

  updatecomment(postId: string, commId: string, body: any): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/posts/${postId}/comments/${commId}`,
      body,
      this.headerToken,
    );
  }
}
