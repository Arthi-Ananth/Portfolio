import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GsapService } from '@core/gsap.service';
import { MotionService } from '@core/motion.service';
import { IntroService } from '@core/intro.service';
import { SoundService } from '@core/sound.service';

/**
 * Plays once per session: a monogram assembles, glows, then splits into a
 * curtain-wipe that reveals the hero underneath. Reverts to an instant fade
 * for reduced motion, and always unlocks scroll + marks itself seen even if
 * something goes wrong mid-timeline.
 */
@Component({
  selector: 'app-intro-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #root class="intro" role="presentation" aria-hidden="true">
      <div #panelLeft class="intro__panel intro__panel--left">
        <div class="intro__grid"></div>
        <span class="intro__letter">A</span>
      </div>
      <div #panelRight class="intro__panel intro__panel--right">
        <div class="intro__grid"></div>
        <span class="intro__letter">A</span>
      </div>
      <div #counter class="intro__counter mono">{{ counterValue() }}%</div>
    </div>
  `,
  styleUrl: './intro-loader.component.scss',
})
export class IntroLoaderComponent implements OnDestroy {
  private readonly gsap = inject(GsapService);
  private readonly motion = inject(MotionService);
  private readonly intro = inject(IntroService);
  private readonly sound = inject(SoundService);

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly panelLeft = viewChild.required<ElementRef<HTMLElement>>('panelLeft');
  private readonly panelRight = viewChild.required<ElementRef<HTMLElement>>('panelRight');
  private readonly counterEl = viewChild.required<ElementRef<HTMLElement>>('counter');

  protected readonly counterValue = signal(0);

  private disposeGsap?: () => void;
  private finished = false;

  constructor() {
    afterNextRender(() => void this.play());
  }

  private async play(): Promise<void> {
    if (!this.motion.animate) {
      // Reduced motion / no-JS fallback: a single quick fade, no transform play.
      this.root().nativeElement.classList.add('intro--instant');
      setTimeout(() => this.finish(), 220);
      return;
    }

    document.body.style.overflow = 'hidden';

    this.disposeGsap = await this.gsap.context(this.root().nativeElement, (gsap) => {
      const left = this.panelLeft().nativeElement;
      const right = this.panelRight().nativeElement;
      const main = document.getElementById('main');
      const counterProxy = { v: 0 };

      if (main) gsap.set(main, { scale: 1.08 });

      const tl = gsap.timeline({ onComplete: () => this.finish() });

      tl.fromTo(
        [left.querySelector('.intro__letter'), right.querySelector('.intro__letter')],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.08 },
      ).to(
        counterProxy,
        {
          v: 100,
          duration: 1,
          ease: 'power1.inOut',
          onUpdate: () => this.counterValue.set(Math.round(counterProxy.v)),
        },
        '<',
      );

      tl.to({}, { duration: 0.18 });
      tl.to(this.counterEl().nativeElement, { opacity: 0, duration: 0.2 }, '<');
      tl.add(() => this.sound.chime());
      tl.to(
        left,
        { xPercent: -120, skewX: -8, filter: 'blur(10px)', duration: 0.7, ease: 'power4.in' },
        '<',
      ).to(
        right,
        { xPercent: 120, skewX: 8, filter: 'blur(10px)', duration: 0.7, ease: 'power4.in' },
        '<',
      );
      if (main) {
        tl.to(main, { scale: 1, duration: 0.8, ease: 'power3.out' }, '<0.1');
      }
    });
  }

  private finish(): void {
    if (this.finished) return;
    this.finished = true;
    document.body.style.overflow = '';
    this.disposeGsap?.();
    this.intro.complete();
  }

  ngOnDestroy(): void {
    this.finish();
  }
}
