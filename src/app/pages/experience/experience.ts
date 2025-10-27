import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css']
})
export class Experience {
  experiences = [
    {
      company: 'Inventzo Systems',
      location: 'Chennai, India',
      role: 'Senior Software Engineer',
      duration: 'Nov 2024 – Present',
      responsibilities: [
        'Designed and developed scalable banking microservices using Spring Boot & Java 8+.',
        'Optimized SQL queries to improve transaction speed by 40%.',
        'Implemented JWT-based authentication and Spring Security.',
        'Configured CI/CD pipelines using Azure DevOps for automated deployments.',
        'Integrated Swagger for seamless API documentation.',
        'Enhanced system performance and reduced API response time by 30%.',
        'Applied caching mechanisms for high-performance backend efficiency.',
        'Handled production incidents and log analysis using Log4j.',
        'Implemented microservice communication via Feign clients.',
        'Participated in Agile sprints and collaborated with cross-functional teams.'
      ],
      tags: ['Spring Boot', 'Java', 'MySQL', 'Azure DevOps', 'Swagger']
    },
    {
      company: 'CGI Information Systems',
      location: 'Bangalore, India',
      role: 'Software Engineer',
      duration: 'Jul 2024 – Nov 2024',
      responsibilities: [
        'Developed RESTful APIs and backend services using Spring Boot & Java.',
        'Worked with PostgreSQL and MongoDB databases for scalable systems.',
        'Implemented testing using JUnit and Mockito frameworks.',
        'Integrated Swagger for API documentation.',
        'Developed authentication and authorization modules.',
        'Improved application performance via code optimization.',
        'Collaborated with DevOps team to deploy on cloud infrastructure.',
        'Participated in Agile Scrum ceremonies and sprint planning.',
        'Resolved production issues by analyzing logs and metrics.',
        'Ensured code quality with peer reviews and SonarQube checks.'
      ],
      tags: ['Spring Boot', 'MongoDB', 'JUnit', 'Mockito', 'CI/CD']
    },
    {
      company: 'Prodapt Solutions',
      location: 'Bangalore, India',
      role: 'Software Engineer',
      duration: 'Dec 2021 – Nov 2023',
      responsibilities: [
        'Developed telecom backend services using Spring Boot and REST APIs.',
        'Optimized queries using JPA and Hibernate for high-volume telecom data.',
        'Integrated Angular frontend with Spring Boot backend services.',
        'Implemented Spring Security for API authentication.',
        'Wrote unit and integration tests with JUnit & Mockito.',
        'Automated deployments via CI/CD pipelines.',
        'Improved backend efficiency using caching and async calls.',
        'Documented API endpoints and versioning details.',
        'Collaborated in Agile sprints and standup meetings.',
        'Troubleshot production incidents with root cause analysis.'
      ],
      tags: ['Spring Boot', 'Angular', 'Hibernate', 'PostgreSQL', 'JPA']
    },
    {
      company: 'Marcellus Infotech',
      location: 'Bangalore, India',
      role: 'System Engineer',
      duration: 'Oct 2020 – Dec 2021',
      responsibilities: [
        'Developed backend services and APIs using Spring Boot framework.',
        'Built REST APIs for mobile and web integrations.',
        'Implemented authentication and exception handling mechanisms.',
        'Worked with MySQL databases and query optimization.',
        'Performed unit testing with JUnit and Mockito.',
        'Deployed microservices using CI/CD pipelines.',
        'Configured application properties for multiple environments.',
        'Participated in Agile team meetings and retrospectives.',
        'Improved API performance through caching and load optimization.',
        'Monitored application logs and production health.'
      ],
      tags: ['Spring Boot', 'MySQL', 'Spring Security', 'JUnit', 'CI/CD']
    }
  ];
}