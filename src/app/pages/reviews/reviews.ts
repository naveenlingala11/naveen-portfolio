import { Component, OnInit } from '@angular/core';
import { Review } from '../../model/review';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  page = 0;
  totalPages = 1;
  pageSize = 5; // 👈 number of reviews per page (adjustable)

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.loadReviews();
  }

  // ✅ Load all reviews from backend
  loadReviews() {
    this.reviewService.getReviews().subscribe({
      next: (res) => {
        // handle both paged and array responses
        const data = res.content || res;
        this.reviews = Array.isArray(data) ? data : [];
        this.totalPages = Math.ceil(this.reviews.length / this.pageSize);
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.reviews = [];
      }
    });
  }

  // ✅ Pagination logic for frontend slicing
  get pagedReviews(): Review[] {
    const start = this.page * this.pageSize;
    return this.reviews.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages - 1) this.page++;
  }

  prevPage() {
    if (this.page > 0) this.page--;
  }
}