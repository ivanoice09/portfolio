import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Project } from '../shared/model/Project';
import { TechStack } from '../shared/model/TechStack';
import { Navbar } from '../navbar/navbar';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [Navbar, TranslatePipe],
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
    { id: 'about', label: 'headers.about' },
    { id: 'projects', label: 'headers.projects' },
    { id: 'contacts', label: 'headers.contacts' },
  ];

  techStackArray: TechStack[] = [
    { id: 1, nameKey: 'Spring Boot', },
    { id: 2, nameKey: 'Angular', },
    { id: 3, nameKey: 'PostgreSQL', },
    { id: 4, nameKey: 'ASP.NET Core', },
    { id: 5, nameKey: 'Microsoft SQL Server', },
    { id: 6, nameKey: 'JavaScript', },
    { id: 7, nameKey: 'PHP', },
    { id: 8, nameKey: 'HTML', },
    { id: 9, nameKey: 'CSS', },
    { id: 10, nameKey: 'Kotlin', },
    { id: 11, nameKey: 'Android SDK', },
  ];

  projects: Project[] = [
    {
      id: 1,
      name: 'Employee Scheduler',
      descriptionKey: 'A web application that simplifies employee shift scheduling. Managers and admins can create and assign shifts efficiently, while employees can easily view their schedules.',
      demoUrlKey: 'https://modernswiftshifter.netlify.app',
      techStackKey: this.techStackArray.filter((tech) => [1, 2, 3].includes(tech.id)),
      docs: [
        {
          id: 1,
          nameKey: 'Full Documentation',
          url: 'https://github.com/ivanoice09/employee-scheduler-docs',
        },
        {
          id: 2,
          nameKey: 'Backend source code',
          url: 'https://github.com/ivanoice09/employee-scheduler',
        },
        {
          id: 3,
          nameKey: 'Frontend source code',
          url: 'https://github.com/ivanoice09/employee-scheduler-fe',
        }
      ],
    },
    {
      id: 2,
      name: 'Bike E-commerce',
      descriptionKey: 'An e-commerce website for bicycles, built as a training project during my course at Betacom Srl. It was my first experience with Angular and helped me develop a strong foundation in ASP.NET Core.',
      techStackKey: this.techStackArray.filter((tech) => [4, 2, 5].includes(tech.id)),
      docs: [
        {
          id: 1,
          nameKey: 'Wireframe with Docs',
          url: 'https://www.figma.com/board/XodZIIm4LohMG02AyWJ18w/Ciclilavarizia-MILAN?t=nKcUFOKPEWXiXGFi-1',
        },
        {
          id: 2,
          nameKey: 'Backend source code',
          url: 'https://github.com/Ciclilavarizia-dev/cl_be',
        },
        {
          id: 3,
          nameKey: 'Frontend source code',
          url: 'https://github.com/Ciclilavarizia-dev/cl_fe',
        }
      ]
    },
    {
      id: 3,
      name: 'Music Player',
      descriptionKey: 'Music Player is my first single-page application, developed with guidance from senior developers at Selexi Srl. Inspired by Spotify, it helped me build a foundation in full-stack development while focusing on user experience and clean, well-structured code.',
      techStackKey: this.techStackArray.filter((tech) => [7, 8, 9, 6].includes(tech.id)),
      docs: [
        {
          id: 1,
          nameKey: 'Source code',
          url: 'https://github.com/ivanoice09/music-player',
        },
      ],
    },
    {
      id: 4,
      name: 'Splityfive',
      descriptionKey: 'SplitFive is an Android expense-splitting application developed as a final group project during my one-year course at ITS Angelo Rizzoli. Working outside my usual skill set taught me to adapt to client requirements, meet deadlines, and collaborate effectively within a team.',
      techStackKey: this.techStackArray.filter((tech) => [10, 11].includes(tech.id)),
      docs: [
        {
          id: 1,
          nameKey: 'Source code & docs',
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
