import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, UserResponse } from './service-proxies';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}api/account`;
  private timer: Subscription;
  
  constructor(private http: HttpClient) { }

  login(login: LoginRequest) {
    return this.http
      .post<UserResponse>(`${this.apiUrl}/login`, login);
      // .pipe(map((user) => {

      // })
      // )
  }
}
