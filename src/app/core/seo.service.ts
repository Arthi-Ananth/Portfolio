import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE } from '@data/site.data';

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  apply(input: SeoInput): void {
    const url = new URL(input.path, SITE.baseUrl).toString();
    const image = input.image ?? new URL('og/cover.png', SITE.baseUrl).toString();

    this.title.setTitle(input.title);
    this.set('name', 'description', input.description);
    this.set('property', 'og:title', input.title);
    this.set('property', 'og:description', input.description);
    this.set('property', 'og:url', url);
    this.set('property', 'og:type', input.type ?? 'website');
    this.set('property', 'og:image', image);
    this.set('name', 'twitter:title', input.title);
    this.set('name', 'twitter:description', input.description);
    this.set('name', 'twitter:image', image);

    this.canonical(url);
    this.jsonLd(input.jsonLd);
  }

  private set(attr: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attr]: key, content }, `${attr}='${key}'`);
  }

  private canonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }

  private jsonLd(data: SeoInput['jsonLd']): void {
    this.doc.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    if (!data) return;
    const blocks = Array.isArray(data) ? data : [data];
    for (const block of blocks) {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', '');
      script.textContent = JSON.stringify(block);
      this.doc.head.appendChild(script);
    }
  }
}
