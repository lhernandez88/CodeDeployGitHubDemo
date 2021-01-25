import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, UserResponse } from './service-proxies';
import { StorageService } from './storage.service';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}api/account`;

  private currentUserSubject = new BehaviorSubject<UserResponse>(null);
  private readonly currentUser$: Observable<UserResponse>;

  constructor(private http: HttpClient, private storageService: StorageService) { 
    this.currentUserSubject = new BehaviorSubject<UserResponse>(this.storageService.getUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUser(): UserResponse {
    return this.currentUserSubject.getValue();
  }

  login(login: LoginRequest): Observable<UserResponse> {
    return this.http
      .post(`${this.apiUrl}/login`, login, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          // get user tokens from headers
          const token = response.headers.get('Authorization');
          const refreshToken = response.headers.get('RefreshToken');
​
          this.storageService.setToken(token);
          this.storageService.setRefreshToken(refreshToken);
        }),
        map((response) => {
          const user = UserResponse.fromJS(response.body['result']);
          this.publishUserUpdate(user);
          return user;
        })
      );
  }
  
  public publishUserUpdate(user: UserResponse | null) {
    this.storageService.setUser(user);
    this.currentUserSubject.next(user);
  }

  public getCurrentUser(): Observable<UserResponse | null> {
    return this.currentUser$;
  }

  public logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      catchError((err) => {
        const apiError: any = err.error;
        const statusCode = !!apiError ? apiError.statusCode : err.status;
​
        //if (statusCode === StatusCodes.UNAUTHORIZED || statusCode === StatusCodes.FORBIDDEN) {
          if (statusCode === 401 || statusCode === 400) {
          // active user token has already expired, not need to invalidate it
          return of(true);
        }
        return throwError(err);
      }),
      finalize(() => this.publishUserUpdate(null))
    );
  }


}
