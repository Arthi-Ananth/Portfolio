import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '@data/site.data';
import { IconComponent } from '@shared/icon.component';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <footer class="foot">
      <div class="container foot__grid">
        <div>
          <p class="foot__name">Arthi A</p>
          <p class="text-subtle">{{ site.role }} · {{ site.location }}</p>
        </div>
        <nav class="foot__links" aria-label="Elsewhere">
          <a class="link" [href]="'mailto:' + site.email"><app-icon name="mail" /> Email</a>
          <a class="link" [href]="site.github" target="_blank" rel="noopener"
            ><app-icon name="github" /> GitHub</a
          >
          <a class="link" [href]="site.linkedin" target="_blank" rel="noopener"
            ><app-icon name="linkedin" /> LinkedIn</a
          >
          <a class="link" [href]="'tel:' + site.phone"><app-icon name="phone" /> {{ site.phoneDisplay }}</a>
        </nav>
        <p class="foot__meta text-subtle">
          Built with Angular · {{ year }}<br />
          Designed and coded by Arthi.
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      .foot {
        border-top: 1px solid var(--border);
        padding-block: var(--sp-6) var(--sp-5);
        background: var(--bg-2);
      }
      .foot__grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--sp-4);
        justify-content: space-between;
        align-items: start;
      }
      .foot__name {
        font-family: var(--font-display);
        font-size: 1.2rem;
        font-weight: 600;
      }
      .foot__links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 1.4rem;
      }
      .foot__links a {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--text-muted);
      }
      .foot__meta {
        font-size: var(--step--1);
        text-align: right;
      }
      @media (max-width: 640px) {
        .foot__meta {
          text-align: left;
        }
      }
    `,
  ],
})
export class SiteFooterComponent {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
