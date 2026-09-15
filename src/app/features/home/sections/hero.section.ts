import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
} from '@angular/core';
import { SITE } from '@data/site.data';
import { GsapService } from '@core/gsap.service';
import { ScrollService } from '@core/scroll.service';
import { MascotTransitionService } from '@core/mascot-transition.service';
import { NavMascotService } from '@core/nav-mascot.service';
import { IconComponent } from '@shared/icon.component';
import { MagneticDirective } from '@shared/magnetic.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, MagneticDirective],
  templateUrl: './hero.section.html',
  styleUrl: './hero.section.scss',
})
export class HeroSection implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly gsap = inject(GsapService);
  protected readonly scroll = inject(ScrollService);
  private readonly mascotTransition = inject(MascotTransitionService);
  private readonly navMascot = inject(NavMascotService);
  protected readonly site = SITE;
  protected readonly headline = ['Building', 'interfaces', 'people', 'actually', 'understand.'];
  private dispose?: () => void;

  constructor() {
    afterNextRender(async () => {
      const root = this.host.nativeElement;
      this.dispose = await this.gsap.context(root, (gsap) => {
        const pick = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
        const rand = gsap.utils.random;

        const boot = pick('.boot__line');
        const assemble = pick('[data-assemble]');
        const words = pick('.hero__headline .word');
        const copy = pick('.hero__sub, .hero__ctas > *');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (boot.length) tl.from(boot, { opacity: 0, duration: 0.4, stagger: 0.12 });
        if (assemble.length)
          tl.from(
            assemble,
            {
              opacity: 0,
              x: () => rand(-160, 160),
              y: () => rand(-120, 120),
              rotate: () => rand(-35, 35),
              scale: 0.7,
              duration: 0.9,
              stagger: { each: 0.09, from: 'random' },
            },
            '-=0.1',
          );
        if (words.length)
          tl.from(words, { yPercent: 120, duration: 0.8, stagger: 0.08 }, '-=0.5');
        if (copy.length)
          tl.from(copy, { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, '-=0.4');

        // Loaded in a background tab: GSAP's rAF ticker is throttled, so jump
        // the intro to its end state and let it settle when the tab is shown.
        if (document.hidden) tl.progress(1);
        document.addEventListener(
          'visibilitychange',
          () => {
            if (document.visibilityState === 'visible' && tl.progress() < 1) tl.progress(1);
          },
          { once: true },
        );
      });
    });
  }

  scrollTo(id: string, ev?: MouseEvent): void {
    const el = ev?.currentTarget as HTMLElement | undefined;
    if (el) this.navMascot.pull(id, el);
    this.mascotTransition.runSectionJump(() => this.scroll.scrollTo(id, { instant: true }));
  }

  /** Bit leans toward the primary CTA on hover — same reaction it gives a
   *  nav item, so clicking "Explore my work" doesn't feel disconnected from
   *  the rest of the site's nav-mascot language. */
  onCtaEnter(ev: Event): void {
    this.navMascot.approach('featured', ev.currentTarget as HTMLElement);
  }

  /** Bit notices the dashboard preview too — it's the one piece of the hero
   *  that actually shows the work, worth a reaction. */
  onPreviewEnter(ev: Event): void {
    this.navMascot.approach('featured', ev.currentTarget as HTMLElement);
  }

  onCtaLeave(): void {
    this.navMascot.leave();
  }

  ngOnDestroy(): void {
    this.dispose?.();
  }
}
