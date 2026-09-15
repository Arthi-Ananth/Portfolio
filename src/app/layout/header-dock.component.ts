import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ScrollService } from '@core/scroll.service';
import { SoundService } from '@core/sound.service';
import { NavMascotService } from '@core/nav-mascot.service';
import { MascotTransitionService } from '@core/mascot-transition.service';
import { NAV } from '@data/site.data';
import { SITE } from '@data/site.data';
import { IconComponent } from '@shared/icon.component';
import { ThemeSwitcherComponent } from '@shared/theme-switcher.component';
import { MagneticDirective } from '@shared/magnetic.directive';

/** Tablet (768–1399px) shows only these as direct links; everything else is
 *  reachable through the hamburger sheet, which always lists the full NAV.
 *  Desktop (≥1400px — the dock's own max width, see --container-wide) shows
 *  every link directly; there's room for all of them, so nothing is held
 *  back behind a "More" menu. */
const TABLET_CORE_IDS = new Set(['hero', 'featured', 'toolkit', 'contact']);

@Component({
  selector: 'app-header-dock',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, ThemeSwitcherComponent, MagneticDirective],
  templateUrl: './header-dock.component.html',
  styleUrl: './header-dock.component.scss',
})
export class HeaderDockComponent {
  private readonly scroll = inject(ScrollService);
  private readonly router = inject(Router);
  protected readonly sound = inject(SoundService);
  protected readonly navMascot = inject(NavMascotService);
  private readonly mascotTransition = inject(MascotTransitionService);

  protected readonly nav = NAV;
  protected readonly site = SITE;
  protected readonly menuOpen = signal(false);
  protected readonly compact = computed(() => this.scroll.scrolled());
  protected readonly active = computed(() => this.scroll.activeSection());

  private readonly burgerBtn = viewChild<ElementRef<HTMLButtonElement>>('burgerBtn');
  private readonly sheet = viewChild<ElementRef<HTMLElement>>('sheet');
  private menuOpenedBefore = false;

  constructor() {
    // Mobile/tablet sheet: move focus in on open, restore it to the trigger
    // on close, so keyboard/screen-reader users aren't dropped into the page
    // behind it or left stranded after it disappears.
    effect(() => {
      if (this.menuOpen()) {
        this.menuOpenedBefore = true;
        queueMicrotask(() => this.focusables(this.sheet()?.nativeElement)[0]?.focus());
      } else if (this.menuOpenedBefore) {
        this.burgerBtn()?.nativeElement.focus();
      }
    });
  }

  private focusables(root?: HTMLElement): HTMLElement[] {
    if (!root) return [];
    return Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
  }

  @HostListener('document:keydown', ['$event'])
  onSheetKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen() || event.key !== 'Tab') return;
    const items = this.focusables(this.sheet()?.nativeElement);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  go(id: string, closeMenu = false, ev?: MouseEvent): void {
    if (closeMenu) this.setMenuOpen(false);
    this.sound.click();
    const el = ev?.currentTarget as HTMLElement | undefined;
    if (el) this.navMascot.pull(id, el);
    if (this.router.url.split('#')[0].split('?')[0] === '/') {
      this.mascotTransition.runSectionJump(
        () => this.scroll.scrollTo(id, { instant: true }),
        this.directionTo(id),
      );
    } else {
      void this.router.navigate(['/'], { fragment: id });
    }
  }

  /** Forward for a later nav item, backward for an earlier one, so Bit's
   *  dash reads as guiding the user through the nav order either way. */
  private directionTo(id: string): 'forward' | 'backward' {
    const from = NAV.findIndex((n) => n.id === this.active());
    const to = NAV.findIndex((n) => n.id === id);
    return from !== -1 && to !== -1 && to < from ? 'backward' : 'forward';
  }

  /** Tablet (768–1399px): true for the 4 links that stay visible directly;
   *  everything else is hidden from the row (still reachable via the
   *  hamburger sheet) at that width by CSS. Desktop shows every link. */
  isTabletCore(id: string): boolean {
    return TABLET_CORE_IDS.has(id);
  }

  onNavEnter(id: string, ev: Event): void {
    const el = ev.currentTarget as HTMLElement;
    this.navMascot.approach(id, el);
  }

  onNavLeave(): void {
    this.navMascot.leave();
  }

  toggleMenu(): void {
    this.setMenuOpen(!this.menuOpen());
  }

  /** The one place that opens/closes the sheet — every trigger (burger,
   *  Escape, tapping a nav item inside it) routes through here so the body
   *  scroll-lock always gets cleared with it. Setting `menuOpen` directly
   *  anywhere else risks leaving `body{overflow:hidden}` stuck, which not
   *  only blocks scrolling but also blocks a mobile browser's pull-to-
   *  refresh gesture (it requires the page to be natively scrollable). */
  private setMenuOpen(open: boolean): void {
    this.menuOpen.set(open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.menuOpen()) this.setMenuOpen(false);
  }
}
