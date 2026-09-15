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
import { IntroService } from '@core/intro.service';
import { MascotTransitionService } from '@core/mascot-transition.service';
import { RetroModeService } from '@core/retro-mode.service';
import { NAV } from '@data/site.data';
import { HeaderDockComponent } from '@layout/header-dock.component';
import { SiteFooterComponent } from '@layout/site-footer.component';
import { ScrollProgressComponent } from '@layout/scroll-progress.component';
import { CustomCursorComponent } from '@shared/custom-cursor.component';
import { CompanionComponent } from '@shared/companion.component';
import { IconSpriteComponent } from '@shared/icon-sprite.component';
import { IntroLoaderComponent } from '@shared/intro-loader/intro-loader.component';
import { MascotTransitionComponent } from '@shared/mascot-transition/mascot-transition.component';

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
    IntroLoaderComponent,
    MascotTransitionComponent,
  ],
  template: `
    <app-icon-sprite />
    @if (!intro.hasCompletedIntro()) {
      <app-intro-loader />
    }
    <a class="skip-link" href="#main">Skip to content</a>
    <app-scroll-progress />
    <app-custom-cursor />
    <app-mascot-transition />
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
  protected readonly intro = inject(IntroService);
  private readonly mascotTransition = inject(MascotTransitionService);
  private readonly retroMode = inject(RetroModeService);

  constructor() {
    afterNextRender(() => {
      this.theme.syncFromDom();
      void this.scroll.init();
      this.scroll.observeSections(NAV.map((n) => n.id));
      this.mascotTransition.init();
      this.retroMode.init();
    });
  }

  ngOnDestroy(): void {
    this.scroll.destroy();
  }
}
