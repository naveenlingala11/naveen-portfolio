import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  metrics = [
    { label: 'API Latency Reduced', value: 30, suffix: '%', current: 0 },
    { label: 'Deployment Speed Improved', value: 40, suffix: '%', current: 0 },
    { label: 'Microservices Delivered', value: 25, suffix: '+', current: 0 },
    { label: 'Production Uptime', value: 99.9, suffix: '%', current: 0 }
  ];

  ngOnInit(): void {
    this.animateMetrics();
  }

  private animateMetrics(): void {
    this.metrics.forEach(metric => {
      interval(30)
        .pipe(takeWhile(() => metric.current < metric.value))
        .subscribe(() => {
          metric.current = +(metric.current + metric.value / 60).toFixed(1);
          if (metric.current > metric.value) {
            metric.current = metric.value;
          }
        });
    });
  }

  copyCode() {
    const code = document.querySelector('.code-block')?.textContent || '';
    navigator.clipboard.writeText(code);
  }

  // ================= TECH STACK =================

  isDarkMode = false;
  isVisible = false;

  categories = ['All', 'Backend', 'Frontend', 'Database', 'DevOps', 'Cloud', 'Tools'];
  activeCategory = 'All';

  techStack = [
    // ===== BACKEND =====
    { name: 'Java', icon: 'tech/java.svg', level: 'Advanced', years: 4, category: 'Backend' },
    { name: 'Spring Boot', icon: 'tech/spring-icon-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Backend' },
    { name: 'Spring MVC', icon: 'tech/spring-icon-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Backend' },
    { name: 'Microservices', icon: 'tech/microservice.png', level: 'Advanced', years: 4, category: 'Backend' },
    { name: 'REST APIs', icon: 'tech/json.png', level: 'Advanced', years: 4, category: 'Backend' },
    { name: 'Hibernate / JPA', icon: 'tech/Hibernate.svg', level: 'Advanced', years: 4, category: 'Backend' },
    { name: 'Kafka', icon: 'tech/kafka-svgrepo-com.svg', level: 'Intermediate(Learning)', years: 1, category: 'Backend' },
    { name: 'RabbitMQ', icon: 'tech/rabbitmq.svg', level: 'Intermediate(Learning)', years: 0.6, category: 'Backend' },

    // ===== FRONTEND =====
    { name: 'HTML / CSS', icon: 'tech/html-html-file-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Frontend' },
    { name: 'Bootstrap', icon: 'tech/bootstrap.svg', level: 'Advanced', years: 3.5, category: 'Frontend' },
    { name: 'Angular', icon: 'tech/angular-svgrepo-com.svg', level: 'Intermediate(Learning)', years: 2.5, category: 'Frontend' },

    // ===== DATABASE =====
    { name: 'PostgreSQL', icon: 'tech/postgresql.svg', level: 'Advanced', years: 4, category: 'Database' },
    { name: 'MySQL', icon: 'tech/mysql-logo-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Database' },
    { name: 'MongoDB', icon: 'tech/mongodb.svg', level: 'Intermediate(Learning)', years: 2.5, category: 'Database' },
    { name: 'Redis', icon: 'tech/redis.svg', level: 'Intermediate(Learning)', years: 2.0, category: 'Database' },

    // ===== DEVOPS =====
    { name: 'Maven', icon: 'tech/maven-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'DevOps' },
    { name: 'Docker', icon: 'tech/docker-logo-svgrepo-com.svg', level: 'Intermediate(Learning)', years: 2.5, category: 'DevOps' },
    { name: 'Jenkins', icon: 'tech/jenkins-svgrepo-com.svg', level: 'Intermediate(Learning)', years: 2.5, category: 'DevOps' },

    // ===== CLOUD =====
    { name: 'Azure DevOps', icon: 'tech/azure-subscription-svgrepo-com.svg', level: 'Intermediate(Learning)', years: 2.0, category: 'Cloud' },
    { name: 'AWS', icon: 'tech/aws.svg', level: 'Intermediate(learning)', years: 1.5, category: 'Cloud' },
    { name: 'Vercel', icon: 'tech/vercel-svgrepo-com.svg', level: 'Intermediate(Learning)', years: 1.5, category: 'Cloud' },
    { name: 'Render', icon: 'tech/render.png', level: 'Intermediate(Learning)', years: 1.5, category: 'Cloud' },
    { name: 'Koyeb', icon: 'tech/koyeb.svg', level: 'Intermediate(Learning)', years: 1.5, category: 'Cloud' },
    { name: 'NeonDB', icon: 'tech/neon db.svg', level: 'Intermediate(Learning)', years: 1.5, category: 'Cloud' },

    // ===== TOOLS =====
    { name: 'Git / GitHub', icon: 'tech/github-icon-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Tools' },
    { name: 'Postman', icon: 'tech/postman-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Tools' },
    { name: 'Swagger', icon: 'tech/swagger-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Tools' },
    { name: 'Stack Over Flow', icon: 'tech/stack-overflow.svg', level: 'Advanced', years: 4, category: 'Tools' },
    { name: 'IntelliJ IDEA', icon: 'tech/intellij.svg', level: 'Advanced', years: 4, category: 'Tools' },
    { name: 'Eclipse', icon: 'tech/eclipse-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Tools' },
    { name: 'VS Code', icon: 'tech/vscode-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Tools' },
    { name: 'JIRA / Confluence', icon: 'tech/atlassian-svgrepo-com.svg', level: 'Advanced', years: 4, category: 'Tools' },
    { name: 'Windows', icon: 'tech/windows.svg', level: 'Advanced', years: 10, category: 'Tools' },
    { name: 'MS Office', icon: 'tech/microsoft-office.svg', level: 'Advanced', years: 10, category: 'Tools' },
  ];

  setCategory(c: string) {
    this.activeCategory = c;
    this.isVisible = false;
    setTimeout(() => (this.isVisible = true), 80);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  ngAfterViewInit() {
    setTimeout(() => (this.isVisible = true), 200);
  }

}
