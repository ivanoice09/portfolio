import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Project } from '../shared/model/Project';
import { TechStack } from '../shared/model/TechStack';
import { Navbar } from '../navbar/navbar';

@Component({
  imports: [Navbar],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {

  phoneNumber = '351 994 3594';
  copied = signal(false);
  email = 'sionivan09@gmail.com';
  emailCopied = signal(false);

  sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contacts', label: 'Contacts' },
  ];

  techStackArray: TechStack[] = [
    { id: 1, name: 'Spring Boot', },
    { id: 2, name: 'Angular', },
    { id: 3, name: 'PostgreSQL', },
    { id: 4, name: 'ASP.NET Core', },
    { id: 5, name: 'Microsoft SQL Server', },
    { id: 6, name: 'JavaScript', },
    { id: 7, name: 'PHP', },
    { id: 8, name: 'HTML', },
    { id: 9, name: 'CSS', },
    { id: 10, name: 'Kotlin', },
    { id: 11, name: 'Android SDK', },
  ];

  projects: Project[] = [
    {
      id: 1,
      name: 'Employee Scheduler',
      description: 'A web application that simplifies employee shift scheduling. Managers and admins can create and assign shifts efficiently, while employees can easily view their schedules.',
      demoUrl: 'https://modernswiftshifter.netlify.app',
      techStack: this.techStackArray.filter((tech) => [1, 2, 3].includes(tech.id)),
      docs: [
        {
          id: 1,
          name: 'Full Documentation',
          url: 'https://github.com/ivanoice09/employee-scheduler-docs',
        },
        {
          id: 2,
          name: 'Backend source code',
          url: 'https://github.com/ivanoice09/employee-scheduler',
        },
        {
          id: 3,
          name: 'Frontend source code',
          url: 'https://github.com/ivanoice09/employee-scheduler-fe',
        }
      ],
    },
    {
      id: 2,
      name: 'Bike E-commerce',
      description: 'An e-commerce website for bicycles, built as a training project during my course at Betacom Srl. It was my first experience with Angular and helped me develop a strong foundation in ASP.NET Core.',
      techStack: this.techStackArray.filter((tech) => [4, 2, 5].includes(tech.id)),
      docs: [
        {
          id: 1,
          name: 'Wireframe with Docs',
          url: 'https://www.figma.com/board/XodZIIm4LohMG02AyWJ18w/Ciclilavarizia-MILAN?t=nKcUFOKPEWXiXGFi-1',
        },
        {
          id: 2,
          name: 'Backend source code',
          url: 'https://github.com/Ciclilavarizia-dev/cl_be',
        },
        {
          id: 3,
          name: 'Frontend source code',
          url: 'https://github.com/Ciclilavarizia-dev/cl_fe',
        }
      ]
    },
    {
      id: 3,
      name: 'Music Player',
      description: 'Music Player is my first single-page application, developed with guidance from senior developers at Selexi Srl. Inspired by Spotify, it helped me build a foundation in full-stack development while focusing on user experience and clean, well-structured code.',
      techStack: this.techStackArray.filter((tech) => [7, 8, 9, 6].includes(tech.id)),
      docs: [
        {
          id: 1,
          name: 'Source code',
          url: 'https://github.com/ivanoice09/music-player',
        },
      ],
    },
    {
      id: 4,
      name: 'Splityfive',
      description: 'SplitFive is an Android expense-splitting application developed as a final group project during my one-year course at ITS Angelo Rizzoli. Working outside my usual skill set taught me to adapt to client requirements, meet deadlines, and collaborate effectively within a team.',
      techStack: this.techStackArray.filter((tech) => [10, 11].includes(tech.id)),
      docs: [
        {
          id: 1,
          name: 'Source code & docs',
          url: 'https://github.com/Progetto-android/Splityfive', 
        },
      ],
    },
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

  async copyNumber() {
    await navigator.clipboard.writeText(this.phoneNumber);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  async copyEmail() {
    await navigator.clipboard.writeText(this.email);
    this.emailCopied.set(true);
    setTimeout(() => this.emailCopied.set(false), 2000);
  }

}
