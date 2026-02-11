import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit {

  projects: Project[] = [];
  loading = true;
  error = false;

  constructor(
    private projectService: ProjectService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  deleteProject(id?: number): void {
    if (!id || !confirm('Are you sure you want to delete this project?')) return;

    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(p => p.id !== id);
    });
  }

  isAdmin(): boolean {
    return !!localStorage.getItem('token');
  }
}
