import {
  Component,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';
import { Project, ProjectTab, ProjectVersion } from '../shared/model/project';

@Component({
  imports: [],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
  standalone: true,
})
export class ProjectCard {
  project = input.required<Project>();

  activeTab = signal<ProjectTab>('description');
  isDropdownOpen = signal(false);

  selectedVersion = signal<ProjectVersion | null>(null);

  readonly openRedirect = output<Project>();

  setTab(tab: ProjectTab): void {
    this.activeTab.set(tab);
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update((open) => !open);
  }

  openRedirectModal(): void {
    this.openRedirect.emit(this.project());
  }

  selectVersion(version: ProjectVersion): void {
    this.selectedVersion.set(version);
  }

  // close dropdown when user clicks elsewhere
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const wrapper = event.target as HTMLElement;
    if (!wrapper.closest('.version-select-wrapper')) {
      this.isDropdownOpen.set(false);
    }
  }
}
