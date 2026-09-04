import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '@core/seo.service';
import { SITE } from '@data/site.data';
import { FEATURED } from '@data/projects.data';
import { HeroSection } from './sections/hero.section';
import { ProfileSection } from './sections/profile.section';
import { FeaturedSection } from './sections/featured.section';
import { UniverseSection } from './sections/universe.section';
import { ToolkitSection } from './sections/toolkit.section';
import { ServicesSection } from './sections/services.section';
import { JourneySection } from './sections/journey.section';
import { LabSection } from './sections/lab.section';
import { ContactSection } from './sections/contact.section';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroSection,
    ProfileSection,
    FeaturedSection,
    UniverseSection,
    ToolkitSection,
    ServicesSection,
    JourneySection,
    LabSection,
    ContactSection,
  ],
  template: `
    <app-hero-section />
    <app-profile-section />
    <app-featured-section />
    <app-universe-section />
    <app-toolkit-section />
    <app-services-section />
    <app-journey-section />
    <app-lab-section />
    <app-contact-section />
  `,
})
export class HomePage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
      title: 'Arthi A — Frontend & Angular Developer',
      description: SITE.intro,
      path: '',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Arthi A — Studio',
          url: SITE.baseUrl,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Arthi A',
          jobTitle: 'Frontend & Angular Developer',
          url: SITE.baseUrl,
          email: `mailto:${SITE.email}`,
          sameAs: [SITE.github, SITE.linkedin],
          knowsAbout: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'Responsive UI', 'Dashboards'],
          makesOffer: FEATURED.map((p) => ({
            '@type': 'CreativeWork',
            name: p.name,
            url: new URL(`work/${p.slug}`, SITE.baseUrl).toString(),
          })),
        },
      ],
    });
  }
}
