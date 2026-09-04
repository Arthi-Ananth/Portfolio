import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  signal,
} from '@angular/core';
import { isBrowser } from '@core/platform';
import { MotionService } from '@core/motion.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span>{{ prefix() }}{{ display() }}{{ suffix() }}</span>`,
  styles: [`:host { font-variant-numeric: tabular-nums; }`],
})
export class CounterComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  readonly value = input.required<number>();
  readonly prefix = input('');
  readonly suffix = input('');
  readonly duration = input(1400);

  readonly display = signal(0);
  private io?: IntersectionObserver;
  private raf = 0;

  ngAfterViewInit(): void {
    if (!isBrowser() || !this.motion.animate) {
      this.display.set(this.value());
      return;
    }
    this.io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.run();
          this.io?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.io.observe(this.host.nativeElement);
  }

  private run(): void {
    const target = this.value();
    const start = performance.now();
    const dur = this.duration();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      this.display.set(Math.round(target * eased));
      if (t < 1) this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    if (isBrowser()) cancelAnimationFrame(this.raf);
  }
}
