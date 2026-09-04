import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { MotionService } from '@core/motion.service';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #ring class="ring" aria-hidden="true"><span #label class="label"></span></div>
    <div #dot class="dot" aria-hidden="true"></div>
  `,
  styleUrl: './custom-cursor.component.scss',
})
export class CustomCursorComponent implements OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);

  private readonly ring = viewChild.required<ElementRef<HTMLElement>>('ring');
  private readonly dot = viewChild.required<ElementRef<HTMLElement>>('dot');
  private readonly label = viewChild.required<ElementRef<HTMLElement>>('label');

  private raf = 0;
  private mx = -100;
  private my = -100;
  private rx = -100;
  private ry = -100;
  private active = false;

  constructor() {
    afterNextRender(() => {
      if (this.motion.isCoarse) return;
      this.active = true;
      document.body.classList.add('has-custom-cursor');
      this.zone.runOutsideAngular(() => {
        document.addEventListener('pointermove', this.onMove, { passive: true });
        document.addEventListener('pointerover', this.onOver, { passive: true });
        document.addEventListener('pointerdown', this.onDown, { passive: true });
        document.addEventListener('pointerup', this.onUp, { passive: true });
        this.loop();
      });
    });
  }

  private onMove = (e: PointerEvent) => {
    this.mx = e.clientX;
    this.my = e.clientY;
    this.dot().nativeElement.style.transform = `translate(${this.mx}px, ${this.my}px)`;
  };

  private onOver = (e: PointerEvent) => {
    const el = (e.target as HTMLElement)?.closest<HTMLElement>(
      '[data-cursor], a, button, input, textarea, select, [role="button"]',
    );
    const ring = this.ring().nativeElement;
    const label = this.label().nativeElement;
    if (!el) {
      ring.dataset['state'] = '';
      label.textContent = '';
      return;
    }
    const custom = el.getAttribute('data-cursor');
    if (custom) {
      ring.dataset['state'] = 'label';
      label.textContent = custom;
    } else {
      ring.dataset['state'] = 'hover';
      label.textContent = '';
    }
  };

  private onDown = () => (this.ring().nativeElement.dataset['press'] = 'true');
  private onUp = () => (this.ring().nativeElement.dataset['press'] = 'false');

  private loop = () => {
    this.rx += (this.mx - this.rx) * 0.18;
    this.ry += (this.my - this.ry) * 0.18;
    this.ring().nativeElement.style.transform = `translate(${this.rx}px, ${this.ry}px)`;
    this.raf = requestAnimationFrame(this.loop);
  };

  ngOnDestroy(): void {
    if (!this.active) return;
    cancelAnimationFrame(this.raf);
    document.removeEventListener('pointermove', this.onMove);
    document.removeEventListener('pointerover', this.onOver);
    document.removeEventListener('pointerdown', this.onDown);
    document.removeEventListener('pointerup', this.onUp);
    document.body.classList.remove('has-custom-cursor');
  }
}
