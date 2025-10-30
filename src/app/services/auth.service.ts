import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/api/auth`;
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) { }

  // ✅ Track login state reactively
  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedIn$.next(true); // ✅ notify navbar to update
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ For async template updates
  loginState$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
  getRole(): string | null {
  const token = this.getToken();
  if (!token) return null;
  const decoded: any = jwtDecode(token);
  return decoded.role || null;
}

isAdmin(): boolean {
  return this.getRole() === 'ROLE_ADMIN';
}
}
