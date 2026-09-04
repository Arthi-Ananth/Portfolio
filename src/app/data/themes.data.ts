import { ThemeMeta } from '@models/theme.model';

export const THEMES: ThemeMeta[] = [
  {
    id: 'midnight',
    label: 'Midnight',
    hint: 'Deep blue, the default workspace',
    swatch: ['#0b0f1a', '#7c8bff', '#3fe0d0'],
    mode: 'night',
  },
  {
    id: 'light',
    label: 'Light',
    hint: 'Warm paper, ink and indigo',
    swatch: ['#f6f4ef', '#4b41d8', '#0f8f84'],
    mode: 'day',
  },
  {
    id: 'aurora',
    label: 'Aurora',
    hint: 'Charcoal with a green glow',
    swatch: ['#0c0e12', '#56f0a0', '#8b6cff'],
    mode: 'night',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    hint: 'Navy and aqua, calm and cool',
    swatch: ['#071522', '#35c7e6', '#5b8dff'],
    mode: 'night',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    hint: 'Warm plum, coral and amber',
    swatch: ['#1a1016', '#ff7a59', '#ffc24b'],
    mode: 'night',
  },
  {
    id: 'mono',
    label: 'Mono',
    hint: 'Pure greyscale, minimal',
    swatch: ['#0f0f0f', '#f2f2f2', '#9a9a9a'],
    mode: 'night',
  },
];

export const DEFAULT_THEME = 'midnight';
export const THEME_STORAGE_KEY = 'studio.theme';
