import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ThemeService } from '@core/theme.service';
import { GsapService } from '@core/gsap.service';
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
  private readonly gsap = inject(GsapService);

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
  private readonly chipsRoot = viewChild<ElementRef<HTMLElement>>('chipsRoot');

  /**
   * A real FLIP reorder: capture each chip's current rect, update the
   * order, then let GSAP animate every chip (the one that moved to the end
   * and the ones that shifted up) from its old rect to its new one. The
   * chip elements themselves are the only thing that moves — no separate
   * indicator, nothing fixed/viewport-positioned, nothing that could drift
   * from the card.
   */
  async cycle(): Promise<void> {
    const root = this.chipsRoot()?.nativeElement;
    const els = root ? Array.from(root.querySelectorAll<HTMLElement>('.toy__chip')) : [];
    const [gsap, Flip] = await Promise.all([this.gsap.load(), this.gsap.loadFlip()]);
    const state = Flip && els.length ? Flip.getState(els) : null;

    this.chips.update((c) => [...c.slice(1), c[0]]);

    if (!gsap || !Flip || !state) return;
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.45,
        ease: 'power2.out',
        absolute: true,
        // `absolute: true` takes each chip out of flex flow for the
        // duration of the tween so it can move independently of its
        // reflowing siblings — clear those inline styles once it lands so
        // the chip goes back to being a normal flex child, not a
        // permanently absolutely-positioned one.
        onComplete: () => gsap.set(els, { clearProps: 'all' }),
      });
    });
  }

  // 3 — the switch
  protected readonly done = signal(false);

  // 4 — theme probe: click cycles the live site theme, same "click to
  // cycle" language as the switch/reorder toys above.
  cycleTheme(): void {
    const ids = this.theme.themes.map((t) => t.id);
    const next = ids[(ids.indexOf(this.theme.theme()) + 1) % ids.length];
    this.theme.set(next);
  }
}
