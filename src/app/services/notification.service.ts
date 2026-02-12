import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Notification } from '../model/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private baseUrl = `${environment.apiBaseUrl}/api/notifications`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // 🔔 Create a new notification (and send email)
  create(message: string, type: string): Observable<any> {
    const notification: Notification = { message, type };

    // Send backend notification
    const result = this.http.post<Notification>(this.baseUrl, notification);

    // Also send an email alert
    this.sendNotificationEmail(`📢 ${type}`, message);

    return result;
  }

  clearAll(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }

  markAsRead(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/read`, {});
  }

markAllAsRead(): Observable<any> {
  return this.http.put(`${this.baseUrl}/mark-read`, {});
}

markAllAsUnread(): Observable<any> {
  return this.http.put(`${this.baseUrl}/mark-unread`, {});
}

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // 📬 Send email via Formspree
  sendNotificationEmail(subject: string, message: string) {
    const formspreeUrl = 'https://formspree.io/f/mzzkzvyz'; // ✅ your verified Formspree endpoint
    const payload = {
      name: 'Naveen Portfolio Notifier',
      email: 'naveentechie99@gmail.com',
      message: `${subject}\n\n${message}`
    };

    this.http.post(formspreeUrl, payload, { responseType: 'text' }).subscribe({
      next: () => console.log('✅ Email sent successfully'),
      error: err => console.error('❌ Failed to send email:', err)
    });
  }
}
