import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review';
import { environment } from '../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewUrl = `${environment.apiBaseUrl}/api/reviews`;
  private likeUrl = `${environment.apiBaseUrl}/api/likes`;

  constructor(private http: HttpClient) { }

  getLikes(): Observable<number> {
    return this.http.get<number>(`${this.likeUrl}`);
  }

  toggleLike(userId: string): Observable<number> {
    return this.http.post<number>(`${this.likeUrl}/toggle/${userId}`, {});
  }

  hasLiked(userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.likeUrl}/user/${userId}`);
  }

  // Reviews
  getReviews(page: number = 0, size: number = 5): Observable<any> {
    return this.http.get<any>(`${this.reviewUrl}?page=${page}&size=${size}`);
  }

  submitReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.reviewUrl, review);
  }

  getLatestReview(): Observable<Review> {
    return this.http.get<Review>(`${this.reviewUrl}/latest`);
  }
}
