import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ScrollService } from '@core/scroll.service';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="track" aria-hidden="true">
      <div class="bar" [style.transform]="'scaleX(' + scroll.progress() + ')'"></div>
    </div>
  `,
  styles: [
    `
      .track {
        position: fixed;
        inset: 0 0 auto 0;
        height: 2px;
        background: var(--border);
        z-index: var(--z-progress);
      }
      .bar {
        height: 100%;
        transform-origin: left;
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        transition: transform 0.1s linear;
      }
    `,
  ],
})
export class ScrollProgressComponent {
  protected readonly scroll = inject(ScrollService);
  protected readonly pct = computed(() => Math.round(this.scroll.progress() * 100));
}
