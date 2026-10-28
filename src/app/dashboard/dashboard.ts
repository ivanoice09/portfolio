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
  readonly isDisabled = signal(true);

  phoneNumber = '351 994 3594';
  copied = signal(false);
  email = 'sionivan09@gmail.com';
  emailCopied = signal(false);

  sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contacts', label: 'Contacts' },
  ];

  projects: Project[] = [
    {
      id: 'employee-scheduler',
      title: 'EMPLOYEE SCHEDULER',
      description:
        'A web application that simplifies employee shift scheduling. Managers and admins can create and assign shifts efficiently, while employees can easily view their schedules.',
      documentation: 'https://github.com/ivanoice09/employee-scheduler-docs',
      sourceCodeBe: 'https://github.com/ivanoice09/employee-scheduler',
      sourceCodeFe: 'https://github.com/ivanoice09/employee-scheduler-fe',
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
      title: 'BIKE ECOMMERCE',
      description: 'An e-commerce website for bicycles, built as a training project during my course at Betacom Srl. It was my first experience with Angular and helped me develop a strong foundation in ASP.NET Core.',
      documentation: 'https://www.figma.com/board/XodZIIm4LohMG02AyWJ18w/Ciclilavarizia-MILAN?t=CgBAgLDHB7uhXPjX-1',
      sourceCodeBe: 'https://github.com/Ciclilavarizia-dev/cl_be',
      sourceCodeFe: 'https://github.com/Ciclilavarizia-dev/cl_fe',
      versions: [],
    }
  ];

  openRedirectModal(version: ProjectVersion): void {
    this.selectedRedirectVersion.set(version);
    this.isRedirectModalOpen.set(true);
  }

  closeRedirectModal(): void {
    this.isRedirectModalOpen.set(false);
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
