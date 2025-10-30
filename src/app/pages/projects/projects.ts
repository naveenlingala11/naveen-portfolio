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

  constructor(private projectService: ProjectService, public authService: AuthService) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  deleteProject(id?: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.id !== id);
          console.log(`✅ Project ${id} deleted.`);
        },
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // simple check; can be extended later to check role from JWT
  }


}
