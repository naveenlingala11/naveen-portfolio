import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects {
  projects = [
    {
      name: 'Banking Microservices',
      shortDescription: 'Spring Boot REST APIs for banking apps',
      description: 'Designed and implemented scalable banking microservices using Spring Boot, REST APIs, and database optimizations. Integrated MySQL/PostgreSQL with high-performance tuning.',
      image: 'Banking.jpg',
      link: 'https://github.com/naveenlingala11'
    },
    {
      name: 'Weather Forecast Web App',
      shortDescription: 'Angular + Spring Boot + OpenWeather API',
      description: 'Built a responsive weather forecast web app using Angular & Spring Boot. Integrated OpenWeather API for real-time updates with intuitive UI and animated backgrounds.',
      image: 'Weather.jpg',
      link: 'https://github.com/naveenlingala11'
    },
    {
      name: 'Online Banking Dashboard',
      shortDescription: 'Full-stack Java + Angular application',
      description: 'Developed a complete full-stack banking dashboard with Angular frontend and Spring Boot backend. Included secure authentication, transaction tracking, and modern UI components.',
      image: 'dashboard.jpg',
      link: 'https://github.com/naveenlingala11'
    }
  ];
}
