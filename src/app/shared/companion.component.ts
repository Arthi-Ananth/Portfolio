import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ScrollService } from '@core/scroll.service';
import { MotionService } from '@core/motion.service';
import { GsapService } from '@core/gsap.service';
import { MascotTransitionService } from '@core/mascot-transition.service';
import { NavMascotService, NavMascotTarget } from '@core/nav-mascot.service';
import { RetroModeService } from '@core/retro-mode.service';
import { isBrowser } from '@core/platform';

interface BitState {
  say: string;
  pose: string;
}

const STATES: Record<string, BitState> = {
  hero: { say: 'booting workspace', pose: 'wake' },
  profile: { say: 'opening profile', pose: 'read' },
  featured: { say: 'unpacking builds', pose: 'push' },
  universe: { say: 'sorting projects', pose: 'scan' },
  toolkit: { say: 'wiring the toolkit', pose: 'link' },
  services: { say: 'checking the shelf', pose: 'scan' },
  journey: { say: 'walking the path', pose: 'walk' },
  lab: { say: 'lights on in the lab', pose: 'link' },
  contact: { say: 'ready to send', pose: 'send' },
};

const ANTICIPATE: BitState = { say: 'on it!', pose: 'anticipate' };
const RUN: BitState = { say: '', pose: 'run' };
const ENTER: BitState = { say: 'here we are', pose: 'enter' };
const RETRO: BitState = { say: 'retro mode online', pose: 'retro' };
const NAV_WALK: BitState = { say: 'on my way!', pose: 'nav-walk' };
const NAV_PULL: BitState = { say: 'gotcha!', pose: 'nav-pull' };

@Component({
  selector: 'app-companion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bit-host--active]': 'isActive()',
  },
  template: `
    @if (visible()) {
      <div
        class="bit"
        [attr.data-pose]="state().pose"
        [attr.data-dir]="mascotTransition.direction()"
        [class.bit--onrail]="onRail()"
        aria-hidden="true"
      >
        @if (state().pose === 'run') {
          <span class="bit__trail" style="animation-delay:0ms"></span>
          <span class="bit__trail" style="animation-delay:70ms"></span>
          <span class="bit__trail" style="animation-delay:140ms"></span>
        }
        @if (state().pose === 'nav-pull') {
          <svg class="bit__rope" aria-hidden="true">
            <line x1="17" y1="4" x2="17" y2="-34"></line>
          </svg>
        }
        <svg viewBox="0 0 48 48" class="bit__body">
          <rect x="9" y="11" width="30" height="26" rx="9" class="bit__shell" />
          <circle cx="19" cy="24" r="3" class="bit__eye" />
          <circle cx="29" cy="24" r="3" class="bit__eye" />
          <path d="M18 30q6 4 12 0" class="bit__mouth" />
          <path d="M24 11V5M24 5h4" class="bit__antenna" />
          <circle cx="28" cy="5" r="1.6" class="bit__spark" />
        </svg>
        <span class="bit__say mono">{{ state().say }}</span>
      </div>
    }
  `,
  styleUrl: './companion.component.scss',
})
export class CompanionComponent implements OnDestroy {
  private readonly scroll = inject(ScrollService);
  private readonly motion = inject(MotionService);
  private readonly gsap = inject(GsapService);
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly mascotTransition = inject(MascotTransitionService);
  private readonly navMascot = inject(NavMascotService);
  private readonly retro = inject(RetroModeService);

  private readonly mounted = signal(false);

  /** Screen transition or nav-rail reaction in progress — Bit stays visible
   *  through this even on touch/narrow viewports where it's otherwise docked
   *  off, so the transition it leads is never invisible on mobile. */
  protected readonly isActive = computed(
    () => this.mascotTransition.phase() !== 'idle' || this.navMascot.phase() !== 'idle',
  );
  protected readonly visible = computed(
    () => this.mounted() && this.motion.animate && (!this.motion.isCoarse || this.isActive()),
  );
  protected readonly onRail = computed(() => this.navMascot.phase() !== 'idle');

  private dockOrigin: { x: number; y: number } | null = null;
  private readonly onResize = (): void => {
    this.dockOrigin = null;
  };

  constructor() {
    afterNextRender(() => {
      this.mounted.set(true);
      window.addEventListener('resize', this.onResize);
    });

    effect(() => {
      const phase = this.navMascot.phase();
      const target = this.navMascot.target();
      void this.travel(phase, target);
    });
  }

  ngOnDestroy(): void {
    if (isBrowser()) window.removeEventListener('resize', this.onResize);
  }

  protected readonly state = computed<BitState>(() => {
    const phase = this.mascotTransition.phase();
    if (phase === 'anticipate') return ANTICIPATE;
    if (phase === 'run') return RUN;
    if (phase === 'enter') return ENTER;
    const navPhase = this.navMascot.phase();
    if (navPhase === 'walk') return NAV_WALK;
    if (navPhase === 'pull') return NAV_PULL;
    if (this.retro.active()) return RETRO;
    return STATES[this.scroll.activeSection()] ?? STATES['hero'];
  });

  private async travel(
    phase: 'idle' | 'walk' | 'pull',
    target: NavMascotTarget | null,
  ): Promise<void> {
    if (!this.motion.animate || this.motion.isCoarse) return;
    const gsap = await this.gsap.load();
    if (!gsap) return;
    const el = this.hostRef.nativeElement;

    if (phase === 'idle' || !target) {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.6)' });
      return;
    }

    const rect = el.getBoundingClientRect();
    const curX = Number(gsap.getProperty(el, 'x')) || 0;
    const curY = Number(gsap.getProperty(el, 'y')) || 0;
    this.dockOrigin ??= { x: rect.left - curX, y: rect.top - curY };

    const desiredLeft = target.x - rect.width / 2;
    const desiredTop = target.y + 14;
    const nextX = desiredLeft - this.dockOrigin.x;
    const nextY = desiredTop - this.dockOrigin.y;

    if (phase === 'walk') {
      gsap.to(el, { x: nextX, y: nextY, duration: 0.45, ease: 'power2.out' });
    } else {
      const tl = gsap.timeline();
      tl.to(el, { x: nextX, y: nextY, duration: 0.3, ease: 'power3.in' }).to(el, {
        y: nextY + 16,
        duration: 0.16,
        ease: 'power1.in',
        yoyo: true,
        repeat: 1,
      });
    }
  }
}
