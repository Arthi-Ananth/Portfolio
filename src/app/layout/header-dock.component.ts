import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ScrollService } from '@core/scroll.service';
import { NAV } from '@data/site.data';
import { SITE } from '@data/site.data';
import { IconComponent } from '@shared/icon.component';
import { ThemeSwitcherComponent } from '@shared/theme-switcher.component';
import { MagneticDirective } from '@shared/magnetic.directive';

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

  protected readonly nav = NAV;
  protected readonly site = SITE;
  protected readonly menuOpen = signal(false);
  protected readonly compact = computed(() => this.scroll.scrolled());
  protected readonly active = computed(() => this.scroll.activeSection());

  go(id: string, closeMenu = false): void {
    if (closeMenu) this.menuOpen.set(false);
    if (this.router.url.split('#')[0].split('?')[0] === '/') {
      this.scroll.scrollTo(id);
    } else {
      void this.router.navigate(['/'], { fragment: id });
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.menuOpen()) this.toggleMenu();
  }
}
