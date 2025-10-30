import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

declare var bootstrap: any; // ✅ for Bootstrap collapse control

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, AfterViewInit {
  title = 'naveen-portfolio';
  isDarkMode = false;
  scrollProgress = 0;
  currentYear = new Date().getFullYear();
  isLoggedIn = false; // ✅ track login state

  constructor(private themeService: ThemeService, private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        AOS.refresh();
      }
    });
  }

  ngOnInit() {
    // AOS
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false, offset: 100, });

    // load theme preference (ThemeService already applied initial value, keep local copy)
    this.isDarkMode = this.themeService.isDark();

    // initial scroll progress
    this.updateProgress();
    // ✅ reactively watch login state
    this.authService.loginState$().subscribe(state => this.isLoggedIn = state);
    // Also set initial value
    // ✅ Update navbar instantly when login state changes
    this.authService.loginState$().subscribe((state) => {
      this.isLoggedIn = state;
    });
    // ✅ Also check once at load
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    // sync local state
    this.isDarkMode = this.themeService.isDark();
  }

  // Close navbar menu after clicking link on mobile
  closeMenu(navMenu: HTMLElement): void {
    const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateProgress();
    // small navbar shadow toggle if needed
    const nav = document.querySelector('.custom-navbar');
    if (nav) {
      if (window.scrollY > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    }
  }

  updateProgress() {
    const doc = document.documentElement;
    const scrollTop = window.pageYOffset || doc.scrollTop || document.body.scrollTop || 0;
    const height = doc.scrollHeight - doc.clientHeight;
    const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
    this.scrollProgress = Math.min(Math.max(scrolled, 0), 100);
  }

  ngAfterViewInit(): void {
    // Close mobile navbar after link click (bootstrap dependent)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navMenu');
    if (navbarCollapse && (window as any).bootstrap) {
      const bsCollapse = new (window as any).bootstrap.Collapse(navbarCollapse, { toggle: false });
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 992) { bsCollapse.hide(); }
        });
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // 👈 Redirect to Home after logout
  }

}
