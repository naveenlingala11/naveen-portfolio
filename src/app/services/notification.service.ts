import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private baseUrl = `${environment.apiBaseUrl}/api/notifications`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(message: string, type: string): Observable<any> {
    return this.http.post(this.baseUrl, { message, type });
  }

  clearAll(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }

  markAsRead(id: number): Observable<any> {
  return this.http.patch(`${this.baseUrl}/${id}/read`, {});
}

markAllAsRead(): Observable<any> {
  return this.http.patch(`${this.baseUrl}/read-all`, {});
}

markAllAsUnread(): Observable<any> {
  return this.http.patch(`${this.baseUrl}/unread-all`, {});
}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
