import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../model/project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = `${environment.apiBaseUrl}/api/projects`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  add(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  update(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
