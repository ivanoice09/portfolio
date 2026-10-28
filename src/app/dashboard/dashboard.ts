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

  readonly isRedirectModalOpen = signal(false);
  readonly selectedRedirectVersion = signal<ProjectVersion | null>(null);
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
      description:
        'A web application that simplifies employee shift scheduling. Managers and admins can create and assign shifts efficiently, while employees can easily view their schedules.',
      documentation: 'https://github.com/ivanoice09/employee-scheduler-docs',
      sourceCodes: [
        'https://github.com/ivanoice09/employee-scheduler',
        'https://github.com/ivanoice09/employee-scheduler-fe',
      ],
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
  ];

  openRedirectModal(version: ProjectVersion): void {
    this.selectedRedirectVersion.set(version);
    this.isRedirectModalOpen.set(true);
  }

  closeRedirectModal(): void {
    this.isRedirectModalOpen.set(false);
  }


}
