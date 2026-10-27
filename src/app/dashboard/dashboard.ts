import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, signal } from '@angular/core';
import { Sidenav } from '../sidenav/sidenav';

interface AppVersion {
  label: string;
  url: string;
  active: boolean;
}

@Component({
  imports: [Sidenav],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {

  readonly activeTab = signal<'description' | 'details' | 'tech-stack'>('description');
  readonly disabled = signal(true);
  isRedirectModalOpen = signal(false);

  isDropdownOpen = false;

  versions: AppVersion[] = [
    { label: 'modern-ui', url: 'https://modernswiftshifter.netlify.app', active: true },
    { label: 'traditional', url: 'https://swiftshifter.netlify.app', active: false },
  ];

  siteUrl = this.versions[0].url;
  selectedVersion = this.versions[0];

  sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contacts', label: 'Contacts' },
  ];

  setTab(tab: 'description' | 'details' | 'tech-stack') {
    this.activeTab.set(tab);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openRedirectModal() {
    this.isRedirectModalOpen.set(true);
  }

  closeRedirectModal() {
    this.isRedirectModalOpen.set(false);
  }

  selectVersion(selected: AppVersion): void {
    this.versions.forEach(v => (v.active = v === selected))
    this.siteUrl = selected.url;
    this.isDropdownOpen = false;
  }

  // close dropdown when user clicks elsewhere
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const wrapper = event.target as HTMLElement;
    if (!wrapper.closest('.version-select-wrapper')) {
      this.isDropdownOpen = false;
    }
  }
}

