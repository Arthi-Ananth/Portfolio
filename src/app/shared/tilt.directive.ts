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

/** Gentle 3D perspective tilt following the pointer. Desktop + motion only. */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);

  readonly tiltMax = input(6, { transform: (v: number | string) => Number(v) || 6 });

  private move = (e: PointerEvent) => {
    const r = this.el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const max = this.tiltMax();
    this.el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };
  private leave = () => {
    this.el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  };

  private get el(): HTMLElement {
    return this.host.nativeElement;
  }

  ngAfterViewInit(): void {
    if (!isBrowser() || !this.motion.animate || this.motion.isCoarse) return;
    this.el.style.transition = 'transform .3s var(--ease-out)';
    this.el.style.transformStyle = 'preserve-3d';
    this.zone.runOutsideAngular(() => {
      this.el.addEventListener('pointermove', this.move);
      this.el.addEventListener('pointerleave', this.leave);
    });
  }

  ngOnDestroy(): void {
    this.el.removeEventListener('pointermove', this.move);
    this.el.removeEventListener('pointerleave', this.leave);
  }
}
