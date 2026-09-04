import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRERENDER_SLUGS } from '@data/projects.data';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'work/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PRERENDER_SLUGS.map((slug) => ({ slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
