import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ThemeService } from '@core/theme.service';
import { RevealDirective } from '@shared/reveal.directive';

@Component({
  selector: 'app-lab-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  templateUrl: './lab.section.html',
  styleUrl: './lab.section.scss',
})
export class LabSection {
  protected readonly theme = inject(ThemeService);

  // 1 — sparkline scrubber
  protected readonly points = [32, 22, 26, 12, 18, 6, 14, 9, 20];
  protected readonly hoverIdx = signal<number | null>(null);
  protected readonly path = computed(() => {
    const w = 200;
    const h = 60;
    const max = Math.max(...this.points);
    return this.points
      .map((p, i) => {
        const x = (i / (this.points.length - 1)) * w;
        const y = h - (p / max) * (h - 8) - 4;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  });

  // 2 — sortable chips
  protected readonly chips = signal(['Overview', 'Guides', 'API', 'FAQ', 'Changelog']);
  cycle(): void {
    this.chips.update((c) => [...c.slice(1), c[0]]);
  }

  // 3 — the switch
  protected readonly done = signal(false);
}
