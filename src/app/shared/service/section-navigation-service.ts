import { Service, signal } from '@angular/core';
import { ScrollSection } from '../model/scroll-section';

@Service()
export class SectionNavigationService {
  readonly activeSection = signal('');

  private sections: ScrollSection[] = [];

  private readonly handleViewportChange = () => this.updateActiveSection();

  setSections(sections: ScrollSection[]): void {
    this.sections = sections;
    this.updateActiveSection();
  }

  startTracking(): void {
    document.addEventListener('scroll', this.handleViewportChange, {
      capture: true,
      passive: true,
    });

    window.addEventListener('resize', this.handleViewportChange, {
      passive: true,
    });

    this.updateActiveSection();
  }

  stopTracking(): void {
    document.removeEventListener('scroll', this.handleViewportChange, {
      capture: true,
    });

    window.removeEventListener('resize', this.handleViewportChange);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    this.activeSection.set(id);
  }

  private updateActiveSection(): void {
    const viewportCenter = window.innerHeight / 2;

    let closestId = this.sections[0]?.id ?? '';
    let smallestDistance = Number.POSITIVE_INFINITY;

    for (const { id } of this.sections) {
      const element = document.getElementById(id);

      if (!element) {
        continue;
      }

      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestId = id;
      }
    }

    this.activeSection.set(closestId);
  }
}
