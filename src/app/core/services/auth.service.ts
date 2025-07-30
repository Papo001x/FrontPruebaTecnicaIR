import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRES_AT_KEY = 'token_expires_at';
  private readonly EXPIRATION_MINUTES = 10; // Cambia esto según tu backend

  setToken(token: string): void {
    const expiresAt = Date.now() + this.EXPIRATION_MINUTES * 60 * 1000;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt.toString());
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const expiresAt = parseInt(
      localStorage.getItem(this.EXPIRES_AT_KEY) || '0',
      10
    );
    return !!token && Date.now() < expiresAt;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_AT_KEY);
    localStorage.removeItem('userId');
    localStorage.removeItem('rolId');
  }
}
