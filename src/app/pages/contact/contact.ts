import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Review } from '../../model/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit {
  sending = false;
  successMessage = '';
  errorMessage = '';
  likes = 0;
  hasLiked = false;
  userId = '';

  reviews: Review[] = [];       // all reviews
  latestReview?: Review;        // just one
  review: Review = { name: '', email: '', message: '', rating: 0, createdAt: '' };

  constructor(
    private http: HttpClient,
    private reviewService: ReviewService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || crypto.randomUUID();
    localStorage.setItem('userId', this.userId);
    this.loadLikes();
    this.checkIfLiked();
    this.loadReviews();
    this.loadLatestReview();
  }

  /** ✅ Contact Form Submission via Formspree */
  sendEmail(form: NgForm) {
    if (form.invalid) return;
    this.sending = true;

    const formspreeUrl = 'https://formspree.io/f/mzzkzvyz';
    const formData = {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message
    };

    this.http.post(formspreeUrl, formData, { responseType: 'text' }).subscribe({
      next: () => {
        this.sending = false;
        this.successMessage = '✅ Message sent successfully!';
        form.resetForm();
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.sending = false;
        this.errorMessage = '❌ Failed to send message. Try again.';
      }
    });
  }

  /** ❤️ Like functionality */
  loadLikes() {
    this.reviewService.getLikes().subscribe({
      next: count => this.likes = count,
      error: err => console.error('Error loading likes:', err)
    });
  }

  checkIfLiked() {
    this.reviewService.hasLiked(this.userId).subscribe({
      next: liked => this.hasLiked = liked,
      error: err => console.error('Error checking like:', err)
    });
  }

  onLike() {
    this.reviewService.toggleLike(this.userId).subscribe({
      next: count => {
        this.likes = count;
        this.hasLiked = !this.hasLiked;
      },
      error: err => console.error('Error toggling like:', err)
    });
  }

  /** 💬 Submit Review */
  submitReview(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = '⚠️ Please fill in all fields correctly.';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }

    const review = {
      ...this.review,
      date: new Date().toISOString(),
    };

    this.http.post('http://localhost:8080/api/reviews', review).subscribe({
      next: (res) => {
        console.log('✅ Review submitted:', res);
        this.successMessage = '🎉 Thank you! Your review has been submitted.';
        this.errorMessage = '';
        this.loadReviews();
        form.resetForm();

        // Automatically clear message after 3 seconds
        setTimeout(() => (this.successMessage = ''), 3000);

        // Optionally scroll smoothly to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error('❌ Error submitting review:', err);
        this.errorMessage = '❌ Failed to submit review. Try again later.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      },
    });
  }


  /** ⭐ Star Rating */
  setRating(star: number) {
    this.review.rating = star;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  /** 🔁 Load All Reviews */
  loadReviews() {
    this.http.get<any>('http://localhost:8080/api/reviews').subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.reviews = data.sort((a, b) =>
            new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
          );
        } else {
          console.warn('Expected array but got:', data);
          this.reviews = []; // fallback
        }
      },
      error: err => console.error('Error loading reviews:', err)
    });
  }


  /** 🆕 Load Latest Review */
  loadLatestReview() {
    this.http.get<Review>('http://localhost:8080/api/reviews/latest').subscribe({
      next: (review) => this.latestReview = review,
      error: err => console.error('Error fetching latest review:', err)
    });
  }

  /** 📄 Navigate to Reviews Page */
  viewAllReviews() {
    this.router.navigate(['/reviews']);
  }

}