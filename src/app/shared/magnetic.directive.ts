import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  input,
} from '@angular/core';
import { isBrowser } from '@core/platform';
import { MotionService } from '@core/motion.service';

/** Subtle magnetic pull toward the pointer; springs back on leave. */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);

  readonly magneticStrength = input(0.35, {
    transform: (v: number | string) => Number(v) || 0.35,
  });

  private enter = () => this.el.style.setProperty('transition', 'transform .2s var(--ease-spring)');
  private move = (e: PointerEvent) => {
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * this.magneticStrength();
    const y = (e.clientY - (r.top + r.height / 2)) * this.magneticStrength();
    this.el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
  };
  private leave = () => {
    this.el.style.transform = 'translate(0,0)';
  };

  private get el(): HTMLElement {
    return this.host.nativeElement;
  }

  ngAfterViewInit(): void {
    if (!isBrowser() || !this.motion.animate || this.motion.isCoarse) return;
    this.zone.runOutsideAngular(() => {
      this.el.addEventListener('pointerenter', this.enter);
      this.el.addEventListener('pointermove', this.move);
      this.el.addEventListener('pointerleave', this.leave);
    });
  }

  ngOnDestroy(): void {
    this.el.removeEventListener('pointerenter', this.enter);
    this.el.removeEventListener('pointermove', this.move);
    this.el.removeEventListener('pointerleave', this.leave);
  }
}
