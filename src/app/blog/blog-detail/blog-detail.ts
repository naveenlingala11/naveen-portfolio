import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../model/blog-post';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetailComponent implements OnInit {
  blog?: BlogPost;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.blogService.getById(id).subscribe({
        next: (data) => {
          this.blog = data;
          this.blogService.incrementViews(id).subscribe();
        },
        error: () => (this.errorMessage = 'Failed to load blog'),
      });
    }
  }

  likeBlog(): void {
    if (!this.blog?.id) return;
    this.blogService.like(this.blog.id).subscribe({
      next: (updated) => (this.blog!.likes = updated.likes),
    });
  }

  addComment(): void {
    const newComment = this.blog?.newComment?.trim();
    if (!this.blog?.id || !newComment) return;

    this.blogService.addComment(this.blog.id, newComment).subscribe({
      next: (updated) => (this.blog = { ...updated, newComment: '' }),
    });
  }

  deleteComment(index: number): void {
    if (!this.blog?.id) return;
    this.blogService.deleteComment(this.blog.id, index).subscribe({
      next: (updated) => (this.blog = updated),
    });
  }
  deleteBlog(): void {
    if (!this.blog?.id || !confirm('Are you sure you want to delete this blog?')) return;
    this.blogService.delete(this.blog.id).subscribe({
      next: () => window.history.back(),
      error: () => alert('Failed to delete blog'),
    });
  }
  // ✅ NEW — Share blog
  shareBlog(): void {
    if (!this.blog) return;

    const shareUrl = window.location.href;
    const shareText = `Check out this blog: "${this.blog.title}"`;

    if (navigator.share) {
      navigator.share({
        title: this.blog.title,
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        // Fallback if user cancels share
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  }

}
