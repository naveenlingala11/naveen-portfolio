import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeKey = 'theme_mode';

  constructor() {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
  }

  toggleTheme(): void {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.themeKey, isDark ? 'dark' : 'light');
  }

  isDark(): boolean {
    return document.body.classList.contains('dark-theme');
  }
}
