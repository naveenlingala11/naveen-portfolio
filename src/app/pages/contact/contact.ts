import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
 sending = false;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  sendEmail(form: NgForm) {
    if (form.invalid) return;

    this.sending = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message
    };

    // ✅ Replace with your own Formspree form endpoint
    const formspreeUrl = 'https://formspree.io/f/mzzkzvyz';

    this.http.post(formspreeUrl, formData, { responseType: 'text' }).subscribe({
      next: () => {
        this.sending = false;
        this.successMessage = '✅ Message sent successfully!';
        form.resetForm();
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.sending = false;
        this.errorMessage = '❌ Failed to send message. Please try again later.';
      }
    });
  }
}