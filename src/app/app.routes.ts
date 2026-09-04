import { Routes } from '@angular/router';
import { PRERENDER_SLUGS } from '@data/projects.data';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
    data: { animation: 'home' },
  },
  {
    path: 'work/:slug',
    loadComponent: () =>
      import('./features/work/work-detail.page').then((m) => m.WorkDetailPage),
    data: { animation: 'work' },
  },
  { path: '**', redirectTo: '' },
];

export const WORK_SLUGS = PRERENDER_SLUGS;
