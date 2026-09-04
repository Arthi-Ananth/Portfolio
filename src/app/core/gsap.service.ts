import { Injectable } from '@angular/core';
import type { gsap as GsapNs } from 'gsap';
import { isBrowser } from './platform';
import { MotionService } from './motion.service';
import { inject } from '@angular/core';

type Gsap = typeof GsapNs;

/**
 * Loads GSAP + ScrollTrigger lazily, in the browser only. Components ask for a
 * scoped context via `create()` and dispose it in ngOnDestroy — that reverts
 * every tween and ScrollTrigger the component made, so nothing leaks.
 */
@Injectable({ providedIn: 'root' })
export class GsapService {
  private readonly motion = inject(MotionService);
  private loader?: Promise<Gsap | null>;

  get enabled(): boolean {
    return this.motion.animate;
  }

  async load(): Promise<Gsap | null> {
    if (!isBrowser() || !this.motion.animate) return null;
    this.loader ??= (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      return gsap;
    })();
    return this.loader;
  }

  /** Run `fn` inside a gsap.context bound to `scope`; returns a disposer. */
  async context(
    scope: Element | undefined,
    fn: (gsap: Gsap) => void,
  ): Promise<() => void> {
    const gsap = await this.load();
    if (!gsap) return () => {};
    const ctx = gsap.context(() => fn(gsap), scope);
    return () => ctx.revert();
  }

  async refresh(): Promise<void> {
    const gsap = await this.load();
    if (!gsap) return;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    ScrollTrigger.refresh();
  }

  async activeTriggerCount(): Promise<number> {
    if (!isBrowser()) return 0;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    return ScrollTrigger.getAll().length;
  }
}
