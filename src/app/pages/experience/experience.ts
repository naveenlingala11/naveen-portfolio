import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * ================================
 * Interfaces (Scalable & Clean)
 * ================================
 */

interface Experience {
  company: string;
  location: string;
  role: string;
  duration: string;
  expanded: boolean;
  responsibilities: string[];
  tags: string[];
  projects: Project[];
}

interface Project {
  name: string;
  client: string;
  role: string;
  duration: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
  expanded: boolean;
}

interface Achievement {
  icon: string;
  title: string;
  description: string;
  metric?: string;
}

interface TechCategory {
  category: string;
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css']
})
export class Experience_Component {

  /**
   * ================================
   * Global Filters & UI State
   * ================================
   */
  activeFilter: string = 'ALL';
  searchText: string = '';

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  /**
   * ================================
   * EXPERIENCE SUMMARY (Top Stats)
   * ================================
   */
  experienceSummary = {
    totalExperience: '4 Years',
    specialization: 'Java Backend Engineer',
    architecture: 'Microservices',
    cloudDevOps: 'Azure DevOps',
    performanceImpact: '30–40% Optimization',
    productionReadiness: true
  };

  /**
   * ================================
   * KEY ACHIEVEMENTS (Resume Metrics)
   * ================================
   */
  achievements: Achievement[] = [
    {
      icon: '🚀',
      title: 'API Performance Optimization',
      description: 'Reduced API response times using query optimization, caching, and efficient backend logic.',
      metric: '30%'
    },
    {
      icon: '⚡',
      title: 'Database Optimization',
      description: 'Improved transaction throughput through indexing, schema tuning, and optimized queries.',
      metric: '40%'
    },
    {
      icon: '🔁',
      title: 'CI/CD Automation',
      description: 'Automated build and deployment pipelines using Azure DevOps.',
      metric: '40% Faster Releases'
    },
    {
      icon: '🛠',
      title: 'Production Stability',
      description: 'Resolved critical production issues using log analysis and root cause analysis.',
      metric: '99% Issue Resolution'
    },
    {
      icon: '🔐',
      title: 'Security Implementation',
      description: 'Implemented JWT-based authentication and Spring Security for enterprise APIs.'
    },
    {
      icon: '📦',
      title: 'Microservices Delivery',
      description: 'Designed and delivered scalable Spring Boot microservices in production environments.'
    }
  ];

  /**
   * ================================
   * TECHNOLOGY STACK (Categorized)
   * ================================
   */
  techStack: TechCategory[] = [
    {
      category: 'Programming & Frameworks',
      technologies: [
        'Java 8', 'Java 11', 'Java 17',
        'Spring Boot', 'Spring MVC',
        'Spring Security', 'Hibernate', 'JPA'
      ]
    },
    {
      category: 'Architecture',
      technologies: [
        'Microservices',
        'RESTful APIs',
        'Event-Driven Architecture',
        'Feign Client'
      ]
    },
    {
      category: 'Databases & Caching',
      technologies: [
        'MySQL',
        'PostgreSQL',
        'Oracle',
        'MongoDB',
        'Redis'
      ]
    },
    {
      category: 'CI/CD & DevOps',
      technologies: [
        'Azure DevOps',
        'Jenkins',
        'Maven',
        'Docker',
        'Git',
        'GitHub',
        'SVN'
      ]
    },
    {
      category: 'Testing & Quality',
      technologies: [
        'JUnit',
        'Mockito',
        'Postman',
        'Swagger / OpenAPI',
        'SonarQube'
      ]
    },
    {
      category: 'Frontend & Tools',
      technologies: [
        'Angular (Basic)',
        'HTML',
        'CSS',
        'IntelliJ IDEA',
        'Eclipse',
        'Spring Tool Suite',
        'JIRA',
        'Confluence'
      ]
    }
  ];

  /**
   * ================================
   * EXPERIENCE + PROJECTS (CORE DATA)
   * ================================
   */
  experiences: Experience[] = [

    {
      company: 'Capgemini',
      location: 'Bangalore, India',
      role: 'Software Engineer',
      duration: 'Nov 2024 – Present',
      expanded: false,
      responsibilities: [
        'Developed and maintained scalable backend microservices using Java, Spring Boot, Hibernate, and REST APIs.',
        'Designed service and DAO layers following layered architecture and design patterns.',
        'Implemented JPA and Hibernate ORM for efficient data persistence.',
        'Improved backend performance using caching and asynchronous processing.',
        'Integrated Angular frontend with Spring Boot backend services.',
        'Performed unit testing using JUnit and Mockito.',
        'Automated build and deployment processes using CI/CD pipelines.',
        'Documented API endpoints and versioning details.',
        'Participated in Agile ceremonies and sprint reviews.'
      ],
      tags: [
        'Java',
        'Spring Boot',
        'Hibernate',
        'JPA',
        'PostgreSQL',
        'Microservices',
        'Angular',
        'CI/CD'
      ],
      projects: [
        {
          name: 'Academy Sports + Outdoors (E-Commerce)',
          client: 'SAPIENT',
          role: 'Software Engineer – API Developer',
          duration: 'Dec 2021 – Nov 2023',
          description: 'High-scale e-commerce backend platform.',
          expanded: false,
          responsibilities: [
            'Developed REST APIs using Spring Boot.',
            'Implemented DAO and Service layers.',
            'Performed unit testing using Mockito.',
            'Optimized application performance.',
            'Used Maven and Git.'
          ],
          techStack: [
            'Java',
            'Spring Boot',
            'Hibernate',
            'PostgreSQL',
            'Microservices'
          ]
        }
      ]
    },

    /**
     * -------------------------------
     * CGI
     * -------------------------------
     */
    {
      company: 'CGI Information Systems & Management Consultants Pvt. Ltd.',
      location: 'Bangalore, India',
      role: 'Software Engineer',
      duration: 'Jul 2024 – Nov 2024',
      expanded: false,
      responsibilities: [
        'Designed, developed, and deployed scalable RESTful APIs using Java and Spring Boot for enterprise banking applications.',
        'Worked on TD Bank CMOD (Content Management on Demand) platform.',
        'Implemented backend services using MongoDB for scalable data management.',
        'Developed authentication and authorization mechanisms to secure APIs.',
        'Performed unit and integration testing using JUnit and Mockito.',
        'Reviewed peer code and merge requests, enforcing coding standards.',
        'Prepared technical and design documentation during sprint planning.',
        'Resolved production issues through log analysis and debugging.',
        'Collaborated with QA, DevOps, and business teams in Agile Scrum environment.'
      ],
      tags: [
        'Java',
        'Spring Boot',
        'REST APIs',
        'MongoDB',
        'JUnit',
        'Mockito',
        'Agile',
        'JIRA'
      ],
      projects: [
        {
          name: 'CMOD – Content Management on Demand',
          client: 'TD Bank',
          role: 'Software Engineer – API Developer',
          duration: 'Jul 2024 – Nov 2024',
          description: 'Custom enhancement platform to manage configurable banking features.',
          expanded: false,
          responsibilities: [
            'Designed and developed REST APIs using Spring Boot.',
            'Implemented secure backend services for banking data.',
            'Reviewed merge requests and ensured code quality.',
            'Prepared technical documentation.',
            'Used Git, JIRA, and TeamForge for project tracking.'
          ],
          techStack: [
            'Java',
            'Spring Boot',
            'MongoDB',
            'REST APIs'
          ]
        }
      ]
    },

    /**
     * -------------------------------
     * PRODAPT
     * -------------------------------
     */
    {
      company: 'Prodapt Solutions Pvt. Ltd.',
      location: 'Bangalore, India',
      role: 'Software Engineer',
      duration: 'Dec 2021 – Nov 2023',
      expanded: false,
      responsibilities: [
        'Architected and developed high-performance backend microservices using Java 8/11 and Spring Boot for enterprise payroll and banking systems.',
        'Designed and implemented RESTful APIs following microservices architecture, SOLID principles, and clean coding standards.',
        'Reduced API response time by 30% by optimizing backend logic, SQL queries, and introducing Redis-based caching.',
        'Enhanced transaction processing speed by 40% through database query tuning, indexing, and schema optimization.',
        'Implemented secure authentication and authorization using Spring Security with JWT-based token management.',
        'Developed inter-service communication using Feign clients for seamless microservice integration.',
        'Automated CI/CD pipelines using Azure DevOps, significantly reducing deployment cycle time.',
        'Integrated Swagger/OpenAPI for API documentation, testing, and client collaboration.',
        'Handled production incidents, log analysis, and root cause analysis using Log4j.',
        'Actively participated in Agile/Scrum ceremonies, sprint planning, code reviews, and retrospectives.'
      ],
      tags: [
        'Java 8/11',
        'Spring Boot',
        'Microservices',
        'MySQL',
        'Redis',
        'Azure DevOps',
        'Swagger',
        'Spring Security'
      ],
      projects: [
        {
          name: 'WinOM Microservices (Payroll)',
          client: 'Windstream',
          role: 'Software Engineer',
          duration: 'Nov 2024 – Present',
          description: 'Enhancement and modernization of legacy payroll systems into scalable microservices.',
          expanded: false,
          responsibilities: [
            'Designed RESTful APIs using Spring Boot.',
            'Implemented business validations and workflow modules.',
            'Optimized backend latency and performance.',
            'Managed builds and dependencies using Maven.',
            'Used Git for version control and collaborative development.'
          ],
          techStack: [
            'Java',
            'Spring Boot',
            'Microservices',
            'Hibernate',
            'MySQL',
            'Redis',
            'Azure DevOps'
          ]
        }
      ]

    },

  ];

  /**
   * ================================
   * DERIVED HELPERS (Future UI Use)
   * ================================
   */

  get totalProjects(): number {
    return this.experiences.reduce(
      (count, exp) => count + exp.projects.length,
      0
    );
  }

  get allTechnologies(): string[] {
    const techSet = new Set<string>();
    this.techStack.forEach(cat =>
      cat.technologies.forEach(t => techSet.add(t))
    );
    return Array.from(techSet);
  }

  // 👇 ADD HERE
  get filteredExperiences() {
    if (this.activeFilter === 'ALL') {
      return this.experiences;
    }
    return this.experiences.filter(exp =>
      exp.company.toLowerCase().includes(this.activeFilter.toLowerCase())
    );
  }
}
