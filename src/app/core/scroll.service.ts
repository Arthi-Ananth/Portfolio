import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject, signal } from '@angular/core';
import { isBrowser } from './platform';
import { MotionService } from './motion.service';

interface LenisLike {
  raf(time: number): void;
  scrollTo(target: string | number | HTMLElement, opts?: Record<string, unknown>): void;
  destroy(): void;
  on(evt: 'scroll', cb: () => void): void;
}

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly doc = inject(DOCUMENT);
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);

  readonly progress = signal(0);
  readonly activeSection = signal('hero');
  readonly scrolled = signal(false);

  private lenis?: LenisLike;
  private rafId = 0;
  private observer?: IntersectionObserver;
  private onScroll = () => this.measure();

  async init(): Promise<void> {
    if (!isBrowser()) return;

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.measure();
    });

    if (this.motion.animate && !this.motion.isCoarse) {
      await this.startLenis();
    }
  }

  private async startLenis(): Promise<void> {
    try {
      const mod = await import('lenis');
      const Lenis = mod.default as unknown as new (o: Record<string, unknown>) => LenisLike;
      this.zone.runOutsideAngular(() => {
        this.lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        const loop = (t: number) => {
          this.lenis?.raf(t);
          this.rafId = requestAnimationFrame(loop);
        };
        this.rafId = requestAnimationFrame(loop);
      });
    } catch {
      /* smooth scroll is a nicety — plain scroll is fine */
    }
  }

  observeSections(ids: string[]): void {
    if (!isBrowser() || this.observer) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) this.zone.run(() => this.activeSection.set(visible.target.id));
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    for (const id of ids) {
      const el = this.doc.getElementById(id);
      if (el) this.observer.observe(el);
    }
  }

  scrollTo(id: string): void {
    if (!isBrowser()) return;
    const el = this.doc.getElementById(id);
    if (!el) return;
    if (this.lenis && this.motion.animate) {
      this.lenis.scrollTo(el, { offset: -70 });
    } else {
      el.scrollIntoView({ behavior: this.motion.animate ? 'smooth' : 'auto', block: 'start' });
    }
  }

  private measure(): void {
    const el = this.doc.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    this.zone.run(() => {
      this.progress.set(p);
      this.scrolled.set(el.scrollTop > 40);
    });
  }

  destroy(): void {
    if (!isBrowser()) return;
    window.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
    this.lenis = undefined;
    this.observer?.disconnect();
    this.observer = undefined;
  }
}
