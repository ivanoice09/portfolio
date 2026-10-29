import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal } from '@angular/core';
import { Project } from '../shared/model/Project';
import { TechStack } from '../shared/model/TechStack';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {  
  projects: Project[] = [
    {
      id: 1,
      name: 'Employee Scheduler',
      description: 'A web application that simplifies employee shift scheduling. Managers and admins can create and assign shifts efficiently, while employees can easily view their schedules.',
      url: 'https://modernswiftshifter.netlify.app',
      techStack: [
        { id: 1, name: 'Spring Boot', },
        { id: 2, name: 'Angular', },
        { id: 3, name: 'PostgreSQL', }
      ]
    },
    {
      id: 2,
      name: 'Bike E-commerce',
    },
    {
      id: 3,
      name: 'Music Player'
    },
    {
      id: 4,
      name: 'Splityfive'
    },
    {
      id: 5,
      name: 'Bank Simulator'
    }
  ];

  openProjectId = signal<number | null>(null);

  toggleAccordion(projectId: number): void {
    this.openProjectId.update((current) =>
      current === projectId ? null : projectId
    );
  }

  isAccordionOpen(projectId: number): boolean {
    return this.openProjectId() === projectId;
  }

}
