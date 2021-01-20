import { Injectable } from '@angular/core';
import { UserResponse } from './service-proxies';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage = localStorage;

  public getUser(): UserResponse | null {
    const userData = this.storage ? this.storage.getItem(USER_KEY) : undefined;
    if (userData) {
      const userObj = JSON.parse(userData);
      return UserResponse.fromJS(userObj);
    }
    return null;
  }

  public setUser(user: UserResponse | null): void {
    if (user) {
      this.storage.setItem(USER_KEY, JSON.stringify(user.toJSON()));
    } else {
      this.storage.removeItem(USER_KEY);
    }
  }
​
  public getToken(): string | null {
    return this.storage ? this.storage.getItem(TOKEN_KEY) : null;
  }
​
  public setToken(token: string | null) {
    if (token) {
      this.storage.setItem(TOKEN_KEY, token);
    } else {
      this.storage.removeItem(TOKEN_KEY);
    }
  }
​
  public setRefreshToken(refreshToken: string | null) {
    if (refreshToken) {
      this.storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      this.storage.removeItem(REFRESH_TOKEN_KEY);
    }
  }
​
  public getRefreshToken(): string | null {
    return this.storage ? this.storage.getItem(REFRESH_TOKEN_KEY) : null;
  }

}
