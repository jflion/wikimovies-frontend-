import { Injectable } from '@angular/core';

const KEY_TOKEN = 'APP_TOKEN';
const KEY_USER = 'APP_USER';

@Injectable({
  providedIn: 'root',
})
export class TokenstorageService {
  constructor() {}

  clearStorage(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(KEY_TOKEN);
    window.sessionStorage.setItem(KEY_TOKEN, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(KEY_TOKEN);
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(KEY_USER);
    window.sessionStorage.setItem(KEY_USER, JSON.stringify(user));
  }

  getCurrentUser(): any {
    const currentUser = window.sessionStorage.getItem(KEY_USER);
    if (currentUser != null) {
      return JSON.parse(currentUser);
    } else {
      return undefined;
    }
  }
}
