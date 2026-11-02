import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionNavigationService } from '../shared/service/section-navigation-service';
import { TechStack } from '../shared/model/tech-stack';
import { Project } from '../shared/model/project';

@Component({
  imports: [Navbar, TranslatePipe],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard implements AfterViewInit, OnDestroy {

  phoneNumber = '351 994 3594';
  copied = signal(false);
  email = 'sionivan09@gmail.com';
  emailCopied = signal(false);

  private readonly sectionNavigation = inject(SectionNavigationService);

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
      descriptionKey: 'description.proj1',
      demoUrlKey: 'https://modernswiftshifter.netlify.app',
      techStackKey: this.techStackArray.filter((tech) => [1, 2, 3].includes(tech.id)),
      docs: [
        {
          id: 1,
          nameKey: 'doc-type.docs',
          url: 'https://github.com/ivanoice09/employee-scheduler-docs',
        },
        {
          id: 2,
          nameKey: 'doc-type.src-code-be',
          url: 'https://github.com/ivanoice09/employee-scheduler',
        },
        {
          id: 3,
          nameKey: 'doc-type.src-code-fe',
          url: 'https://github.com/ivanoice09/employee-scheduler-fe',
        }
      ],
    },
    {
      id: 2,
      name: 'Bike E-commerce',
      descriptionKey: 'description.proj2',      
      techStackKey: this.techStackArray.filter((tech) => [4, 2, 5].includes(tech.id)),
      docs: [
        {
          id: 1,
          nameKey: 'doc-type.wireframe',
          url: 'https://www.figma.com/board/XodZIIm4LohMG02AyWJ18w/Ciclilavarizia-MILAN?t=nKcUFOKPEWXiXGFi-1',
        },
        {
          id: 2,
          nameKey: 'doc-type.src-code-be',
          url: 'https://github.com/Ciclilavarizia-dev/cl_be',
        },
        {
          id: 3,
          nameKey: 'doc-type.src-code-fe',
          url: 'https://github.com/Ciclilavarizia-dev/cl_fe',
        }
      ]
    },
    {
      id: 3,
      name: 'Music Player',
      descriptionKey: 'description.proj3',
      techStackKey: this.techStackArray.filter((tech) => [7, 8, 9, 6].includes(tech.id)),
      docs: [
        {
          id: 1,
          nameKey: 'doc-type.src-code',
          url: 'https://github.com/ivanoice09/music-player',
        },
      ],
    },
    {
      id: 4,
      name: 'Splityfive',
      descriptionKey: 'description.proj4',
      techStackKey: this.techStackArray.filter((tech) => [10, 11].includes(tech.id)),
      docs: [
        {
          id: 1,
          nameKey: 'doc-type.src-code',
          url: 'https://github.com/Progetto-android/Splityfive', 
        },
      ],
    },
  ];

  ngAfterViewInit(): void {
    this.sectionNavigation.setSections(this.sections);
    this.sectionNavigation.startTracking();
  }

  ngOnDestroy(): void {
    this.sectionNavigation.stopTracking();
  }

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
