import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
projects = [
    {
      name: 'Banking Microservices',
      shortDescription: 'Spring Boot REST APIs for banking apps',
      description: 'Designed and implemented scalable banking microservices with Spring Boot, REST APIs, and database optimizations. Integrated with MySQL/PostgreSQL and optimized for high performance.',
      image: 'Banking.jpg',
      link: 'https://github.com/naveenlingala11'
    },
    {
      name: 'Weather Forecast Web App',
      shortDescription: 'Angular + Spring Boot + OpenWeather API',
      description: 'Created a responsive web app using Angular for frontend and Spring Boot for backend. Integrated OpenWeather API to fetch real-time weather data and implemented user-friendly UI.',
      image: 'Weather.jpg',
      link: 'https://github.com/naveenlingala11'
    },
    {
      name: 'Online Banking Dashboard',
      shortDescription: 'Full-stack Java + Angular application',
      description: 'Developed a full-stack banking dashboard with Angular frontend and Spring Boot backend. Implemented account management, transactions, and reporting features with secure authentication.',
      image: 'dashboard.jpg',
      link: 'https://github.com/naveenlingala11'
    }
  ];
}
