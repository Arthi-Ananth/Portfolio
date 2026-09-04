import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  inject,
  input,
} from '@angular/core';
import { isBrowser } from '@core/platform';
import { MotionService } from '@core/motion.service';

/**
 * Reveals the element as it scrolls into view. Content is visible by default;
 * this directive adds `.reveal-armed` to hide it only once JS is running and
 * motion is allowed, then `.is-revealed` when it intersects. With
 * `revealStagger` the direct children are revealed one after another.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  readonly appReveal = input<'' | 'up' | 'left' | 'right' | 'scale'>('');
  readonly revealStagger = input(0, { transform: (v: number | string) => Number(v) || 0 });
  readonly revealOnce = input(true);

  private io?: IntersectionObserver;

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;
    const dir = this.appReveal();
    if (dir && dir !== 'up') el.setAttribute('data-reveal', dir);

    if (!isBrowser() || !this.motion.animate) return;

    const stagger = this.revealStagger();
    const kids = stagger > 0 ? (Array.from(el.children) as HTMLElement[]) : [];

    el.classList.add('reveal-armed');
    kids.forEach((kid, i) => {
      kid.classList.add('reveal-armed');
      kid.style.transitionDelay = `${i * stagger}ms`;
    });

    this.io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.classList.add('is-revealed');
          for (const kid of kids) kid.classList.add('is-revealed');
          if (this.revealOnce()) this.io?.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    this.io.observe(el);

    // Safety net: if the observer never fires (e.g. element already fully in
    // view on load with odd thresholds), reveal after a short beat.
    setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('is-revealed');
        for (const kid of kids) kid.classList.add('is-revealed');
      }
    }, 600);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
