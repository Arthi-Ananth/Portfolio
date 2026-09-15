import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { GsapService } from '@core/gsap.service';
import { MotionService } from '@core/motion.service';
import {
  MascotDirection,
  MascotPhase,
  MascotTransitionService,
} from '@core/mascot-transition.service';

/**
 * Signed travel direction on the Y axis — 'forward' drops the curtain down
 * from above (matches scrolling further down the page), 'backward' rises it
 * from below. A flat sweep, not a shape, so it reads as a panel Bit is
 * pulling across the screen rather than a decorative blob.
 */
const SIGN: Record<MascotDirection, 1 | -1> = { forward: 1, backward: -1 };

/**
 * A single flat curtain panel that covers the screen while Bit crosses it,
 * then keeps travelling the same way and off the far edge — one continuous
 * sweep, not a growing shape. Pure overlay — never blocks or delays
 * navigation, and stays a small, restrained accent, never the main visual.
 */
@Component({
  selector: 'app-mascot-transition',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #veil class="veil" aria-hidden="true"></div>`,
  styleUrl: './mascot-transition.component.scss',
})
export class MascotTransitionComponent {
  private readonly gsap = inject(GsapService);
  private readonly motion = inject(MotionService);
  private readonly mascot = inject(MascotTransitionService);

  private readonly veil = viewChild.required<ElementRef<HTMLElement>>('veil');

  constructor() {
    effect(() => {
      const phase = this.mascot.phase();
      void this.run(phase);
    });
  }

  private async run(phase: MascotPhase): Promise<void> {
    const el = this.veil()?.nativeElement;
    if (!el) return;

    if (!this.motion.animate) {
      const visible = phase === 'run' || phase === 'enter';
      el.style.transition = `opacity var(--dur-2) var(--ease-out)`;
      el.style.display = visible || el.style.opacity !== '0' ? 'block' : 'none';
      el.style.opacity = visible ? '1' : '0';
      if (!visible) setTimeout(() => (el.style.display = 'none'), 260);
      return;
    }

    const gsap = await this.gsap.load();
    if (!gsap) return;

    const sign = SIGN[this.mascot.direction()];

    if (phase === 'run') {
      // Slide in from off-screen, in the direction of travel, to fully cover.
      gsap.set(el, { display: 'block', yPercent: -sign * 100 });
      gsap.to(el, { yPercent: 0, duration: 0.3, ease: 'power2.in' });
    } else if (phase === 'enter') {
      // Keep travelling the same way, off the far edge — reveals the new
      // section as it passes rather than reversing back the way it came.
      gsap.to(el, {
        yPercent: sign * 100,
        duration: 0.38,
        ease: 'power3.out',
        onComplete: () => gsap.set(el, { display: 'none' }),
      });
    } else if (phase === 'idle') {
      gsap.set(el, { display: 'none' });
    }
    // 'anticipate' is Bit's own beat — the curtain stays out of the way
    // until 'run' actually needs to cover the screen.
  }
}
