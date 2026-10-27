import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Sidenav } from '../sidenav/sidenav';

@Component({
  imports: [Sidenav],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {

  readonly activeTab = signal<'description' | 'docs' | 'preview'>('description');
  readonly disabled = signal(true);
  isRedirectModalOpen = signal(false);
  isDropdownOpen = false;

  siteUrl = 'https://google.com';

  sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contacts', label: 'Contacts' },
  ];

  setTab(tab: 'description' | 'docs' | 'preview') {
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
}
