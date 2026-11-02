import { Component, effect, inject, Input, input, output, signal } from '@angular/core';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { SectionNavigationService } from '../shared/service/section-navigation-service';
import { ScrollSection } from '../shared/model/scroll-section';

@Component({
  imports: [TranslatePipe],
  selector: 'app-slide-navbar',
  styleUrl: './slide-navbar.css',
  templateUrl: './slide-navbar.html',
})
export class SlideNavbar {
  open = input.required<boolean>();
  closed = output<void>();
  activeLanguage = signal('');

  @Input({ required: true }) sections: ScrollSection[] = [];

  private translate = inject(TranslateService);
  readonly activeSection = inject(SectionNavigationService).activeSection;
  private readonly sectionNavigation = inject(SectionNavigationService);

  constructor() {
    effect(() => {
      const isLocked = this.open();

      document.documentElement.style.overflow = isLocked ? 'hidden' : '';
      document.body.style.overflow = isLocked ? 'hidden' : '';
    });
  }

  scrollToAndClose(id: string): void {
    this.sectionNavigation.scrollTo(id);
    this.closed.emit();
  }

  close(): void {
    this.closed.emit();
  }

  switchLanguage(lang: 'en' | 'it') {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.activeLanguage.set(lang);
  }
}
