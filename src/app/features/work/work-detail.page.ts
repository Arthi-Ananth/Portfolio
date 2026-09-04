import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  effect,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { projectBySlug, FEATURED } from '@data/projects.data';
import { SITE } from '@data/site.data';
import { SKILLS } from '@data/skills.data';
import { SeoService } from '@core/seo.service';
import { IconComponent } from '@shared/icon.component';
import { FrameComponent } from '@shared/frame.component';
import { SchematicComponent } from '@shared/schematic.component';
import { RevealDirective } from '@shared/reveal.directive';

const SKILL_LABEL = new Map(SKILLS.map((s) => [s.id, s.label]));

@Component({
  selector: 'app-work-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgOptimizedImage,
    IconComponent,
    FrameComponent,
    SchematicComponent,
    RevealDirective,
  ],
  templateUrl: './work-detail.page.html',
  styleUrl: './work-detail.page.scss',
})
export class WorkDetailPage {
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  readonly slug = input.required<string>();
  protected readonly site = SITE;

  protected readonly project = computed(() => projectBySlug(this.slug()));
  protected readonly stackLabels = computed(
    () => this.project()?.stack.map((id) => SKILL_LABEL.get(id) ?? id) ?? [],
  );
  protected readonly live = computed(() =>
    this.project()?.links.find((l) => l.kind === 'live'),
  );
  protected readonly sources = computed(
    () => this.project()?.links.filter((l) => l.kind === 'source') ?? [],
  );
  protected readonly others = computed(() =>
    FEATURED.filter((p) => p.slug !== this.slug()).slice(0, 3),
  );

  constructor() {
    effect(() => {
      const p = this.project();
      if (!p) {
        void this.router.navigateByUrl('/');
        return;
      }
      this.seo.apply({
        title: `${p.name} — case study · Arthi A`,
        description: p.summary,
        path: `work/${p.slug}`,
        type: 'article',
        image: p.shots[0]?.src
          ? new URL(`assets/${p.shots[0].src}`, SITE.baseUrl).toString()
          : undefined,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: p.name,
          headline: p.statement,
          abstract: p.summary,
          dateCreated: p.year,
          url: new URL(`work/${p.slug}`, SITE.baseUrl).toString(),
          author: { '@type': 'Person', name: 'Arthi A', url: SITE.baseUrl },
          keywords: this.stackLabels().join(', '),
        },
      });
    });
  }
}
