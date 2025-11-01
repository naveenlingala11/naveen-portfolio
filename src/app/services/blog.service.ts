import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blog-post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = `${environment.apiBaseUrl}/api/blogs`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  getById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  create(blog: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, blog);
  }

  update(id: number, blog: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, blog);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  like(id: number): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}/like`, {});
  }
  
  incrementViews(id: number): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}/view`, {});
  }

  view(id: number): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}/view`, {});
  }

  addComment(id: number, comment: string): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/${id}/comments`, comment);
  }

  deleteComment(id: number, index: number): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${this.apiUrl}/${id}/comments/${index}`);
  }

  getFeatured(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/featured`);
  }

  getByCategory(category: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/category/${category}`);
  }

  getByAuthor(author: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/author/${author}`);
  }
}
