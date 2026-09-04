import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@core/theme.service';
import { ScrollService } from '@core/scroll.service';
import { NAV } from '@data/site.data';
import { HeaderDockComponent } from '@layout/header-dock.component';
import { SiteFooterComponent } from '@layout/site-footer.component';
import { ScrollProgressComponent } from '@layout/scroll-progress.component';
import { CustomCursorComponent } from '@shared/custom-cursor.component';
import { CompanionComponent } from '@shared/companion.component';
import { IconSpriteComponent } from '@shared/icon-sprite.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderDockComponent,
    SiteFooterComponent,
    ScrollProgressComponent,
    CustomCursorComponent,
    CompanionComponent,
    IconSpriteComponent,
  ],
  template: `
    <app-icon-sprite />
    <a class="skip-link" href="#main">Skip to content</a>
    <app-scroll-progress />
    <app-custom-cursor />
    <app-header-dock />
    <main id="main">
      <router-outlet />
    </main>
    <app-companion />
    <app-site-footer />
  `,
})
export class App implements OnDestroy {
  private readonly theme = inject(ThemeService);
  private readonly scroll = inject(ScrollService);

  constructor() {
    afterNextRender(() => {
      this.theme.syncFromDom();
      void this.scroll.init();
      this.scroll.observeSections(NAV.map((n) => n.id));
    });
  }

  ngOnDestroy(): void {
    this.scroll.destroy();
  }
}
