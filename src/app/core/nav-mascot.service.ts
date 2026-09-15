import { Injectable, signal } from '@angular/core';

export type NavMascotPhase = 'idle' | 'walk' | 'pull';

export interface NavMascotTarget {
  id: string;
  x: number;
  y: number;
}

/**
 * Bridges nav-item hover/click in the header dock to Bit's on-rail walk +
 * pull animation. Pure position/phase state — CompanionComponent owns the
 * actual tween.
 */
@Injectable({ providedIn: 'root' })
export class NavMascotService {
  readonly phase = signal<NavMascotPhase>('idle');
  readonly target = signal<NavMascotTarget | null>(null);

  private settleTimer = 0;

  /** Bit springs onto the rail and runs to a hovered nav item. */
  approach(id: string, el: HTMLElement): void {
    window.clearTimeout(this.settleTimer);
    this.target.set(this.point(el, id));
    this.phase.set('walk');
  }

  /** Bit grabs the item with a rope and hauls it into view. */
  pull(id: string, el: HTMLElement): void {
    window.clearTimeout(this.settleTimer);
    this.target.set(this.point(el, id));
    this.phase.set('pull');
    this.settleTimer = window.setTimeout(() => this.phase.set('idle'), 700);
  }

  /** Pointer left the rail without a click — hop back to the dock. */
  leave(): void {
    window.clearTimeout(this.settleTimer);
    if (this.phase() === 'walk') this.phase.set('idle');
  }

  private point(el: HTMLElement, id: string): NavMascotTarget {
    const r = el.getBoundingClientRect();
    return { id, x: r.left + r.width / 2, y: r.bottom };
  }
}
