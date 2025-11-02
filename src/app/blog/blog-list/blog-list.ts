import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../model/blog-post';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.css']
})
export class BlogListComponent implements OnInit {
  blogs: BlogPost[] = [];
  filteredBlogs: BlogPost[] = [];
  selectedCategory: string = 'All';
  errorMessage = '';
  categories: string[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getAll().subscribe({
      next: (data) => {
        // Sort by latest first
        this.blogs = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

        // Extract unique categories
        const cats = this.blogs
          .map((b) => b.category)
          .filter((cat): cat is string => !!cat);
        this.categories = [...new Set(cats)];

        // ✅ Automatically display all blogs on load
        this.selectedCategory = 'All';
        this.filteredBlogs = [...this.blogs];
      },
      error: () => (this.errorMessage = 'Failed to load blogs'),
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredBlogs =
      category === 'All'
        ? [...this.blogs]
        : this.blogs.filter((b) => b.category === category);
  }

  likeBlog(blog: BlogPost): void {
    if (!blog.id) return;
    this.blogService.like(blog.id).subscribe({
      next: (updated) => (blog.likes = updated.likes),
      error: () => alert('Failed to like blog'),
    });
  }

  viewBlog(blog: BlogPost): void {
    if (blog.id) {
      this.blogService.view(blog.id).subscribe();
      this.router.navigate(['/blogs', blog.id]);
    }
  }
  deleteBlog(blog: BlogPost): void {
    if (!blog.id || !confirm('Are you sure you want to delete this blog?')) return;
    this.blogService.delete(blog.id).subscribe({
      next: () => {
        this.blogs = this.blogs.filter((b) => b.id !== blog.id);
        this.filteredBlogs = this.filteredBlogs.filter((b) => b.id !== blog.id);
      },
      error: () => alert('Failed to delete blog'),
    });
  }
}
