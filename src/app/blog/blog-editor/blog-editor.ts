import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../model/blog-post';

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-editor.html',
  styleUrls: ['./blog-editor.css']
})
export class BlogEditorComponent implements OnInit {
  blog: BlogPost = {
    title: '',
    content: '',
    category: '',
    authorName: '',
    tags: [],
    featured: false,
    shortDescription: ''
  };

  isSaving = false;

  isEditMode = false;
  isUploading = false;
  uploadSuccess = false;
  imagePreview: string | null = null;
  errorMessage = '';

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.blogService.getById(+id).subscribe({
        next: (data) => (this.blog = data),
        error: () => (this.errorMessage = 'Failed to load blog'),
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.isUploading = true;
    this.uploadSuccess = false;

    // Simulated upload delay (replace with actual API call if needed)
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        this.blog.imageUrl = reader.result as string;
        this.imagePreview = this.blog.imageUrl;
        this.isUploading = false;
        this.uploadSuccess = true;
      }, 1500);
    };
    reader.readAsDataURL(file);
  }

  addTag(tagInput: HTMLInputElement): void {
    const value = tagInput.value.trim();
    if (value && !this.blog.tags?.includes(value)) {
      this.blog.tags = [...(this.blog.tags || []), value];
    }
    tagInput.value = '';
  }

  removeTag(tag: string): void {
    this.blog.tags = this.blog.tags?.filter(t => t !== tag);
  }

  saveBlog(): void {
    this.isSaving = true;
    const obs = this.isEditMode && this.blog.id
      ? this.blogService.update(this.blog.id, this.blog)
      : this.blogService.create(this.blog);

    obs.subscribe({
      next: (saved: BlogPost) => {
        alert(`✅ Blog ${this.isEditMode ? 'updated' : 'published'} successfully!`);
        this.isSaving = false;
        this.router.navigate(['/blogs', saved.id || this.blog.id]);
      },
      error: (err) => {
        console.error('Save failed', err);
        this.isSaving = false;
        alert('❌ Failed to save blog');
      }
    });
  }

}
