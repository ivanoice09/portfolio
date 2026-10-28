import { Component, computed, HostListener, input, output, signal } from '@angular/core';
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
  selectedVersion = signal<ProjectVersion | null>(null);

  openRedirect = output<ProjectVersion>();

  activeTab = signal<ProjectTab>('description');
  isDropdownOpen = signal(false);

  setTab(tab: ProjectTab): void {
    this.activeTab.set(tab);
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update((open) => !open);

    if (this.isDropdownOpen() && !this.selectedVersion()) {
      const active = this.project().versions.find((v) => v.active);
      if (active) this.selectedVersion.set(active);
    }
  }

  selectVersion(version: ProjectVersion): void {
    this.selectedVersion.set(version);
    this.isDropdownOpen.set(false);
  }

  hasVersions = computed(() => {
    const versions = this.project().versions;
    return !!versions?.length;
  });

  openRedirectModal(): void {
    if (!this.hasVersions()) return;
    const version = this.selectedVersion() ?? this.project().versions[0];
    if (version) {
      this.openRedirect.emit(version);
    }
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
