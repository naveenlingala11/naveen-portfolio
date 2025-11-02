import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

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
  notifications: any[] = [];
  unreadCount: number = 0;

  constructor(private themeService: ThemeService, private authService: AuthService, private router: Router, private notificationService: NotificationService) {
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

    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAll().subscribe({
      next: (data) => {
        this.notifications = data;
        this.updateUnreadCount();
      },
      error: (err) => console.error('Error loading notifications', err),
    });
  }

  clearNotifications(): void {
    this.notificationService.clearAll().subscribe({
      next: () => (this.notifications = []),
    });
  }
  toggleTheme() {
    this.themeService.toggleTheme();
    // sync local state
    this.isDarkMode = this.themeService.isDark();
  }
  markAsRead(notification: any): void {
    if (!notification.read) {
      this.notificationService.markAsRead(notification.id).subscribe({
        next: () => {
          notification.read = true;
          this.updateUnreadCount();
        },
        error: (err) => console.error('Error marking as read', err),
      });
    }
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach((n) => (n.read = true));
        this.updateUnreadCount();
      },
      error: (err) => console.error('Error marking all as read', err),
    });
  }

  markAllAsUnread(): void {
    this.notificationService.markAllAsUnread().subscribe({
      next: () => {
        this.notifications.forEach((n) => (n.read = false));
        this.updateUnreadCount();
      },
      error: (err) => console.error('Error marking all as unread', err),
    });
  }


  deleteNotification(notification: any, event: MouseEvent): void {
    event.stopPropagation();
    this.notificationService.delete(notification.id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter((n) => n.id !== notification.id);
        this.updateUnreadCount();
      },
      error: (err) => console.error('Error deleting notification', err),
    });
  }

  updateUnreadCount(): void {
    this.unreadCount = this.notifications.filter((n) => !n.read).length;
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
    // ✅ Close mobile navbar after link click (Bootstrap dependent)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navMenu');

    if (navbarCollapse && (window as any).bootstrap) {
      // Ensure Bootstrap Collapse instance exists
      let bsCollapse = (window as any).bootstrap.Collapse.getInstance(navbarCollapse);
      if (!bsCollapse) {
        bsCollapse = new (window as any).bootstrap.Collapse(navbarCollapse, { toggle: false });
      }

      // Close navbar on link click (for mobile only)
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 992) {
            bsCollapse.hide();
          }
        });
      });
    }

    // ✅ Extra safety: close menu on every route change (mobile only)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && window.innerWidth < 992) {
        const navMenuEl = document.getElementById('navMenu');
        if (navMenuEl) {
          const bsCollapse = (window as any).bootstrap.Collapse.getInstance(navMenuEl);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // 👈 Redirect to Home after logout
  }

}
