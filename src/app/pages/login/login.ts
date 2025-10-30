import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm: any;
  loading = false;
  errorMessage = '';
  successMessage = ''; // ✅ optional toast message

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.loading = false;

        // ✅ Optional success message (non-blocking)
        this.successMessage = 'Login successful! Redirecting...';

        // ✅ Small delay to show message then redirect automatically
        setTimeout(() => {
          this.router.navigate(['/projects']);
        }, 1000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Invalid credentials';
      },
    });
  }
}
