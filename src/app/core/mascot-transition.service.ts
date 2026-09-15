import { Injectable, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { isBrowser } from './platform';
import { MotionService } from './motion.service';

/**
 * Bit-led transition beats: `anticipate` is the instant reaction to a click
 * (before it moves), `run` is Bit crossing the screen while the curtain
 * covers it, `enter` is the curtain clearing and Bit settling into the new
 * section. Back to `idle` once settled.
 */
export type MascotPhase = 'idle' | 'anticipate' | 'run' | 'enter';
export type MascotDirection = 'forward' | 'backward';

const ANTICIPATE_MS = 100;
const RUN_MS = 300;
const ENTER_MS = 380;

/**
 * Single coordinator for the Bit-led transition, driven either by real
 * Angular route changes (route detail pages) or by `runSectionJump` for
 * in-page nav (header dock, mobile sheet, hero CTAs). Everything downstream
 * — the curtain component and Bit's own pose — reacts to `phase` and
 * `direction` here; nothing else owns transition timing.
 */
@Injectable({ providedIn: 'root' })
export class MascotTransitionService {
  private readonly router = inject(Router);
  private readonly motion = inject(MotionService);

  readonly phase = signal<MascotPhase>('idle');
  readonly direction = signal<MascotDirection>('forward');

  /** True from the moment a transition starts until it's fully settled —
   *  read by nav components to ignore clicks mid-flight. */
  readonly busy = signal(false);

  private lastPath = '';
  private timers: number[] = [];
  private started = false;

  /** Call once, from the app root, after the router has its initial URL. */
  init(): void {
    if (!isBrowser() || this.started) return;
    this.started = true;
    this.lastPath = this.pathOf(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const path = this.pathOf(event.url);
        if (path === this.lastPath) return;
        this.clearTimers();
        this.direction.set('forward');
        this.busy.set(true);
        this.phase.set('run');
      } else if (event instanceof NavigationEnd) {
        const path = this.pathOf(event.urlAfterRedirects);
        const changed = path !== this.lastPath;
        this.lastPath = path;
        if (!changed || this.phase() === 'idle') return;
        this.phase.set('enter');
        this.after(ENTER_MS, () => this.settle());
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        this.settle();
      }
    });
  }

  /**
   * Same anticipate → run → enter beat as a route swap, but for an in-page
   * section jump: Bit reacts immediately, the curtain covers while `jump`
   * fires the (instant) scroll underneath it, then it clears to reveal the
   * new section. `direction` biases which way Bit and the curtain travel —
   * 'forward' for a later nav item, 'backward' for an earlier one — so it
   * reads as Bit physically guiding you, not a repeated identical fade.
   * Ignored while a transition is already in flight.
   */
  runSectionJump(jump: () => void, direction: MascotDirection = 'forward'): void {
    if (this.busy()) return;
    this.direction.set(direction);
    if (!isBrowser() || !this.motion.animate) {
      this.busy.set(true);
      this.phase.set('run');
      jump();
      this.after(this.motion.animate ? 120 : 0, () => {
        this.phase.set('enter');
        this.after(this.motion.animate ? 160 : 0, () => this.settle());
      });
      return;
    }

    this.busy.set(true);
    this.phase.set('anticipate');
    this.after(ANTICIPATE_MS, () => {
      this.phase.set('run');
      this.after(RUN_MS, () => {
        jump();
        this.phase.set('enter');
        this.after(ENTER_MS, () => this.settle());
      });
    });
  }

  private settle(): void {
    this.phase.set('idle');
    this.busy.set(false);
  }

  private after(ms: number, fn: () => void): void {
    this.timers.push(window.setTimeout(fn, ms));
  }

  private clearTimers(): void {
    for (const t of this.timers) window.clearTimeout(t);
    this.timers = [];
  }

  private pathOf(url: string): string {
    return url.split('#')[0].split('?')[0];
  }
}
