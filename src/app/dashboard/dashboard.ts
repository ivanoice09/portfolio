import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contacts', label: 'Contacts' },
  ];
}
