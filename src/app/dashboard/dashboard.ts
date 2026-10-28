import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Sidenav } from '../sidenav/sidenav';
import { Project, ProjectVersion } from '../shared/model/project';
import { ProjectCard } from '../project-card/project-card';

@Component({
  imports: [Sidenav, ProjectCard],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {

  readonly selectedProject = signal<Project | null>(null);
  readonly isRedirectModalOpen = signal(false);
  readonly disabled = signal(true);

  sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contacts', label: 'Contacts' },
  ];

    projects: Project[] = [
    {
      id: 'employee-scheduler',
      title: 'Employee Scheduler',
      description: 'A web application that simplifies employee shift scheduling...',
      details: 'Documentation, links, architecture notes...',
      techStack: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
      versions: [
        {
          label: 'modern-ui',
          url: 'https://modernswiftshifter.netlify.app',
          active: true,
        },
        {
          label: 'traditional',
          url: 'https://swiftshifter.netlify.app',
          active: false,
        },
      ],
    },
    {
      id: 'bike-ecommerce',
      title: 'Bike Ecommerce',
      description: '...',
      details: '...',
      techStack: ['Angular', 'Node.js', 'MongoDB'],
      versions: [],
    },
    // Music player, Splityfive, Java bank...
  ];

  openModal(project: Project): void {
    this.selectedProject.set(project);
    this.isRedirectModalOpen.set(true);
  }

  closeRedirectModal(): void {
    this.isRedirectModalOpen.set(false);
    this.selectedProject.set(null);
  }
}