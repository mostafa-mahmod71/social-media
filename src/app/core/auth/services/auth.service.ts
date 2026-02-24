import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  signup(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/users/signup', data);
  }

  //   {
  //   "name": "Ahmed Bahnasy",
  //   "username": "Bahnasy202222",
  //   "email": "bahnasyd20222@gmail.com",
  //   "dateOfBirth": "2000-01-01",
  //   "gender": "male",
  //   "password": "Aa@123456",
  //   "rePassword": "Aa@123456"
  // }

  signin(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/users/signin', data);
  }

  //   {
  //   "email": "ahmedbahnasy@gmail.com",
  //   "password": "Bahnasy@123"
  // }
}
