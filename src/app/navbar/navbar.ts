import { Component, HostListener, inject, Input, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SectionNavigationService } from '../shared/service/section-navigation-service';
import { SlideNavbar } from '../slide-navbar/slide-navbar';
import { ScrollSection } from '../shared/model/scroll-section';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, SlideNavbar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  host: {
    '[class.scrolled]': 'isScrolled',
  },
})
export class Navbar {
  @Input({ required: true }) sections: ScrollSection[] = [];

  isScrolled = false;
  activeLanguage = signal('');
  isSlideNavbarOpen = signal(false);

  private translate = inject(TranslateService);
  readonly activeSection = inject(SectionNavigationService).activeSection;
  private readonly sectionNavigation = inject(SectionNavigationService);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

  openSlideNavbar(): void {
    this.isSlideNavbarOpen.set(true);
  }

  closeSlideNavbar(): void {
    this.isSlideNavbarOpen.set(false);
  }

  scrollTo(id: string): void {
    this.sectionNavigation.scrollTo(id);
  }

  switchLanguage(lang: 'en' | 'it') {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.activeLanguage.set(lang);
  }
}
