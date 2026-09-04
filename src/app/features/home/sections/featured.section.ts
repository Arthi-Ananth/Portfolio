import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
} from '@angular/core';
import { FEATURED } from '@data/projects.data';
import { GsapService } from '@core/gsap.service';
import { RevealDirective } from '@shared/reveal.directive';
import { ProjectWindowComponent } from '@shared/project-window.component';

@Component({
  selector: 'app-featured-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, ProjectWindowComponent],
  templateUrl: './featured.section.html',
  styleUrl: './featured.section.scss',
})
export class FeaturedSection implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly gsap = inject(GsapService);
  protected readonly featured = FEATURED;
  private dispose?: () => void;

  constructor() {
    afterNextRender(async () => {
      // If the page opened in a background tab, ScrollTrigger's rAF ticker is
      // throttled and could leave a window stuck at opacity 0 — skip the intro
      // there; the content is already in the DOM.
      if (document.hidden) return;

      this.dispose = await this.gsap.context(this.host.nativeElement, (gsap) => {
        for (const row of Array.from(
          this.host.nativeElement.querySelectorAll<HTMLElement>('app-project-window'),
        )) {
          const frame = row.querySelector<HTMLElement>('.pw__frame');
          const meta = row.querySelector<HTMLElement>('.pw__meta');
          if (!frame || !meta) continue;
          gsap.from([frame, meta], {
            scrollTrigger: { trigger: row, start: 'top 82%' },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.14,
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.dispose?.();
  }
}
