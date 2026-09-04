import { Injectable, signal } from '@angular/core';
import { isBrowser } from './platform';

/** Single source of truth for "should we animate?". */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly browser = isBrowser();
  private readonly _reduced = signal(this.query());
  readonly reduced = this._reduced.asReadonly();

  constructor() {
    if (!this.browser) return;

    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener?.('change', (e) => {
        this._reduced.set(e.matches);
        document.documentElement.toggleAttribute('data-reduced-motion', e.matches);
      });
    }

    // If the tab was hidden while a scroll-reveal transition was mid-flight it
    // can freeze part-way. On return, settle anything already in view.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      requestAnimationFrame(() => {
        for (const el of document.querySelectorAll<HTMLElement>('.reveal-armed:not(.is-revealed)')) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
            el.classList.add('is-revealed');
          }
        }
      });
    });
  }

  private query(): boolean {
    if (!this.browser || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Coarse pointer / small screen — drop cursor and heavy parallax. */
  get isCoarse(): boolean {
    if (!this.browser || !window.matchMedia) return false;
    return window.matchMedia('(hover: none), (pointer: coarse)').matches;
  }

  get animate(): boolean {
    return this.browser && !this._reduced();
  }
}
