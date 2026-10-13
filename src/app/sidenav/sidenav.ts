import { AfterViewInit, Component, Input, OnDestroy, signal } from '@angular/core';

export interface ScrollSection {
  id: string;
  label: string;
}

@Component({
  standalone: true,
  imports: [],
  selector: 'app-sidenav',
  styleUrl: './sidenav.css',
  templateUrl: './sidenav.html',
})
export class Sidenav implements AfterViewInit, OnDestroy {
  @Input({ required: true }) sections: ScrollSection[] = [];

  activeSection = signal('');

  private handleScroll = () => this.updateActiveSection();

  ngAfterViewInit(): void {
    this.updateActiveSection();

    document.addEventListener('scroll', this.handleScroll, {
      capture: true,
      passive: true,
    });

    window.addEventListener('resize', this.handleScroll, {
      passive: true,
    });
  }

  private updateActiveSection() {
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

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    this.activeSection.set(id);
  }

  ngOnDestroy(): void {
    document.removeEventListener('scroll', this.handleScroll, {
      capture: true,
    });

    window.removeEventListener('resize', this.handleScroll);
  }
}
