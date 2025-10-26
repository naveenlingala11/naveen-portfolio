import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'naveen-portfolio';
  isDarkMode = false;
  scrollProgress = 0;

  ngOnInit() {
    AOS.init({
      duration: 1000,   // Animation duration in ms
      easing: 'ease-in-out',
      once: true,       // Animation happens only once
      mirror: false     // Disable animation on scroll-up
    });

    // load theme preference
    const saved = localStorage.getItem('dark-theme');
    this.isDarkMode = saved === 'true';
    this.applyTheme();
    this.updateProgress(); // in case initial scroll not zero
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('dark-theme', this.isDarkMode.toString());
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (scrollTop / docHeight) * 100;
  }

  updateProgress() {
    const doc = document.documentElement;
    const scrollTop = window.pageYOffset || doc.scrollTop || document.body.scrollTop || 0;
    const height = doc.scrollHeight - doc.clientHeight;
    const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
    this.scrollProgress = Math.min(Math.max(scrolled, 0), 100);
  }
}